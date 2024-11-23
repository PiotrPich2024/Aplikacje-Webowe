
function generate(){
    let minRange = Math.floor(Math.abs(Number(document.querySelector('#min').value)));
    let maxRange = Math.floor(Math.abs(Number(document.querySelector('#max').value)));
    let includeUpper = document.querySelector('#upper').checked;
    let includeSpecial = document.querySelector('#special').checked;

    if(isNaN(minRange)){
        alert("Minimalna długość hasła: bierze liczbe całkowitą");
        return;
    }
    if(isNaN(maxRange)){
        alert("Maksymalna długość hasła: bierze liczbe całkowitą");
        return;
    }
    if(maxRange < minRange){
        alert("Maksymalna długość musi być większa od minimalnej długości");
        return;
    }
    debugger

    const funs = [1,2];
    if(includeUpper){
        funs.push(3);
    }
    if(includeSpecial){
        funs.push(4);
    }
    let password = "";
    let l = getLenght(minRange,maxRange);
    for(let i = 0; i < l; i++){
        let m = getRandomFunction(funs);
        if (m == 1){
            password += getRandomLower();
        }
        else if(m == 2){
            password += getRandomNumber().toString();
        }
        else if(m == 3){
            password += getRandomUpper();
        }
        else{
            password += getRandomSymbol();
        }
    }

    alert(password)

}


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getLenght(minRange, maxRange) {
    let dif = maxRange - minRange;
    return Math.floor(Math.random() * dif) + minRange;
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]<>/,.?~';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function getRandomFunction(arr){   
    let n = arr.length;
    return arr[Math.floor(Math.random() * n)]

}
