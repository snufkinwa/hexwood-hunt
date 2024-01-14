/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfInfected = 10;
const infectedArray =[];

let cursorX = 0;
let cursorY = 0;

canvas.addEventListener('mousemove', function(event){
    cursorX = event.offsetX;
    cursorY = event.offsetY;
});

console.log(cursorX);

gameFrame =0;
class Infected {
    constructor(){
        this.image = new Image();
        this.image.src = './racoon_attack-Sheet.png';
        this.y = 450;
        //this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 256;
        this.spriteHeight = 256;
        this.width = this.spriteWidth / 1.75;
        this.height = this.spriteHeight/ 1.75;
        this.x = Math.random() * (canvas.width - this.width);
        this.frame = 0;
        this.attackSpeed = Math.floor(Math.random() * 5 + 1);
    }

    update(){
          // Calculate the direction towards the cursor
          const directionX = cursorX - this.x;
          const directionY = cursorY - this.y;
  
          // Normalize the direction
          const length = Math.sqrt(directionX * directionX + directionY * directionY);
          const normalizedX = directionX / length;
          const normalizedY = directionY / length;
  
          // Move towards the cursor
          this.x += normalizedX * this.attackSpeed;
          this.y += normalizedY * this.attackSpeed;

        //this.x = Math.random() /(canvas.width - this.width);
       // this.y = 600;
        //if (this.x + this.width < 0) this.x = canvas.width;
        if (gameFrame % this.attackSpeed === 0){
        this.frame > 44 ? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        //ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,  this.x, this.y, this.width, this.height);
    }
};

for (let i = 0; i < numberOfInfected; i++){
    infectedArray.push(new Infected());
}

console.log(infectedArray);

const infected1 = new Infected();

function updateObjectPosition(){

}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    infectedArray.forEach(infected =>{
        infected.update();
        infected.draw();
    })
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();