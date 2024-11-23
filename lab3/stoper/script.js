const countdown = document.getElementById("countdown");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false; 

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update,1000);
        isRunning = true;
    }
}

function stop(){
    if(isRunning){
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
    }
}

function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    countdown.textContent = "00:00"
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let minutes = Math.floor(elapsedTime / (1000 * 60));
    let seconds = Math.floor((elapsedTime / 1000)%60);
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2, "0");
    countdown.textContent = `${minutes}:${seconds}`;
}
