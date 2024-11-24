const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const spriteWidth = 200;
const spriteHeight = 312;
let frame = 0;
let nFrames = 10;
const zombieImg = new Image();
zombieImg.src = 'images/walkingdead.png';
let gameFrame = 0;
const stagerFrames = 10;
function animate(){
    ctx.clearRect(0,0,width,height);
    ctx.drawImage(zombieImg,frame * spriteWidth,0,
        spriteWidth,spriteHeight,0,0,width,height);
    if(gameFrame % stagerFrames == 0){
        if(frame == 9){
            frame = 0;
        }
        else{
            frame++
        }
    }
    gameFrame++;
    requestAnimationFrame(animate);
};
animate();