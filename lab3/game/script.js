const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let score = 0;
const textScore = document.getElementById('score');
let gameOver = false;

//muzyczka
const sadMusic = document.getElementById('sad-music');

//mysz
const customCursor = document.getElementById('custom-cursor');
const canvasWrap = document.getElementById('canvas_wrap');

canvasWrap.addEventListener('mousemove', (event) => {
    const rect = canvasWrap.getBoundingClientRect();
    const x = event.clientX - rect.left - customCursor.offsetWidth / 2;
    const y = event.clientY - rect.top - customCursor.offsetHeight / 2;

    customCursor.style.left = `${x}px`;
    customCursor.style.top = `${y}px`;
});


//rozmiary canvasu
const width = canvas.width=1680;
const height = canvas.height=1050;

//klatki gry
let gameFrame = 0;
let staggerFrame = 10;

//informacje do aim


//informacje o zombie
const zombieImg = new Image();
zombieImg.src = 'images/walkingdead.png';
const zombieSpriteWidth = 200;
const zombieSpriteHeight = 312;

class Zombie {
    constructor(){
        this.scale = Math.floor(Math.random()*40) + 60;
        this.x = width - zombieSpriteWidth;
        this.y = getRandomPos();
        this.width = Math.floor((zombieSpriteWidth/100)*this.scale);
        this.height = Math.floor((zombieSpriteHeight/100)*this.scale);
        this.speed = Math.floor(Math.random()*4) + 1;
        this.active = true;
        this.frame = 0;
        this.nFrames = 9;
    }
    update(){
        this.x -= this.speed;
        if(this.x + zombieSpriteWidth <= 0){
            heartslost += 1;
            this.active = false;
        }
    }
    draw(){
        ctx.drawImage(zombieImg,
            this.frame*zombieSpriteWidth,0,
            zombieSpriteWidth,zombieSpriteHeight,
            this.x,this.y,
            this.width,this.height
        );
    }
}

//informacje o zyciach
const heartsFullImg = new Image();
heartsFullImg.src = 'images/full_heart.png';
const heartsEmptyImg = new Image();
heartsEmptyImg.src = 'images/empty_heart.png';
const heartsFullWidth = 433;
const heartsFullHeight = 433;
let heartslost = 0;


class hearts {
    constructor(n){
        this.n = n;
        this.fullWidth = 433;
        this.fullHeight = 433;
        this.emptyWidth = 1197;
        this.emptyHeight = 1197;
    }
    draw(){
        let pageWidth = 86;
        let pageHeight = 86;
        for(let i = 0; i < this.n; i++){
            if(i >= this.n-heartslost){
                ctx.drawImage(
                    heartsEmptyImg,
                    0,0,
                    this.emptyWidth,this.emptyHeight,
                    10 + i*pageWidth, 20,
                    pageWidth,pageHeight
                );
            }
            else{
                ctx.drawImage(
                    heartsFullImg,
                    0,0,
                    this.fullWidth,this.fullHeight,
                    10 + i*pageWidth, 20,
                    pageWidth,pageHeight
                ); 
            }
        }
    }
}

//tablica pozycji zombies
const positions = [];

//generowanie zombie
let create = false;

//klatki animacji zombie
let frame = 0;
let nFrames = 9;
let startYmin = Math.floor(height*(3/4) - zombieSpriteHeight);
let startYmax = height - zombieSpriteHeight;



const  zombies = [];

const zombie1 = new Zombie();

const hp = new hearts(3);

function animate(){
    debugger
    ctx.clearRect(0,0,width,height);
    zombies.forEach(zombie =>{
        if(zombie.active){
            zombie.draw();
            zombie.update();
            if(gameFrame % staggerFrame == 0){
                if(zombie.frame < zombie.nFrames){
                    zombie.frame ++;
                }
                else{
                    zombie.frame=0;   
                }
            }
        }
        else{
            const index = zombies.indexOf(zombie);
            if(index > -1){
                zombies.splice(index,1);
            }
        }
    }
    );
    hp.draw();
    if(heartslost == hp.n){
        gameOver = true;
    }
    if(gameOver){
        showGameOverScreen();
        playMusic();
        return;
    }
    

    gameFrame ++;
    requestAnimationFrame(animate)
}

canvas.addEventListener('click', (event) =>{
    if(gameOver){
        return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    miss = true;
    zombies.forEach(zombie =>{
        let zomXLeft = zombie.x - 20;
        let zomXRight = zombie.x + zombie.width + 20;
        let zombieYTop = zombie.y - 20;
        let zombieYBot = zombie.y + zombie.height + 20; 
        if((zomXLeft <= x && zomXRight >= x)&&(zombieYTop <= y && zombieYBot >= y)){
            miss = false;
            score += 20;
            zombie.active=false;
        }
    })
    if(miss){
        score -= 5;
    }
    stringScore = String(score).padStart(5,'0');
    textScore.innerText = stringScore;

})


function getRandomPos(){
    let diff = startYmax - startYmin;
    return Math.floor(Math.random()*diff) + startYmin;
}

function populate() {
    zombies.push(new Zombie());
    scheduleNextZombie(); 
}

function randomTime() {
    let minTime = 500;
    let maxTime = 2000;
    return Math.floor(Math.random() * (maxTime - minTime)) + minTime;
}

function scheduleNextZombie() {
    setTimeout(populate, randomTime()); 
}


const playAgainButton = document.getElementById('game-over')

function gameLoop(){
    if(!gameOver){
        scheduleNextZombie();
        animate();
    }
}

function showGameOverScreen() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; 
    ctx.fillRect(0, 0, width, height);
    if(sadMusic.paused){
        sadMusic.play();
    }
    playAgainButton.style.display = 'block';
}

playAgainButton.addEventListener('click', ()=>{
    playAgainButton.style.display = 'none';
    gameOver = false;
    heartslost = 0;
    score = 0;
    zombies.length=0;
    stringScore = String(score).padStart(5, '0');
    textScore.innerText = stringScore;
    sadMusic.pause();
    sadMusic.currentTime = 0;
    gameLoop();
})



gameLoop();
