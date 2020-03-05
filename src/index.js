const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};
function translateToNumber(morse){
    let numberMorse = {};
    let arrKeys = Object.keys(morse);

    //primary state numberMorse
    for(let init = 0; init < arrKeys.length; init++){
        numberMorse[arrKeys[init]] = '';
    }
    // add value in form numbers
    for(let i = 0; i < arrKeys.length; i++){
        for(let j = 0 ; j<arrKeys[i].length; j++){
            if(arrKeys[i][j] === '.'){
                numberMorse[arrKeys[i]] += '10'; 
            }
            else {
                numberMorse[arrKeys[i]] += '11';
            }
        }
    }
    //add zero numbers
    for(let key in numberMorse){
        let zeroStart = '0';
        let zero = '';
        
        if(numberMorse[key].length < 10){
            let counter = 10 - numberMorse[key].length;
            for(let i = 0; i < counter; i++){
                zero += zeroStart;
            }
            let splitMorse = numberMorse[key].split('');
            splitMorse.splice(0,0,zero);
            let finalCode = splitMorse.join('');
            numberMorse[key] = finalCode;
        }
    }
    return numberMorse;
}
function decode(expr) {
   let morse = translateToNumber(MORSE_TABLE);
    //divide encoded message on 10
    let arr = [];
    let count = 0;
    let strExpr = '';
    for (let i = 0; i < expr.length; i++) {
        count++;
        strExpr += expr[i]
        if (count == 10) {
            arr.push(strExpr);
            count = 0;
            strExpr = '';
        }
    }
        //finish decode message
        let finishDecode = '';
        for (let i = 0; i < arr.length; i++) {
            for (let key in morse) {
                if (morse[key] == arr[i]) {
                    finishDecode += MORSE_TABLE[key];
                }
    
            }
            if (arr[i] == '**********') {
                finishDecode += ' ';
            }
        }
        return finishDecode;
}

module.exports = {
    decode
}