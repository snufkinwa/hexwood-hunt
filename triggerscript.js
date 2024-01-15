const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 72;
        this.spriteHeight = 72;
        //Multiplying gives better performance than divsion in JS
        this.width = this.spriteWidth * 2;
        this.height = this.spriteHeight * 2;
        //centers animation at click event
        this.x = x - this.width *0.5;
        this.y = y - this.height *0.5;
        this.image = new Image();
        this.image.src = './spritesheet.png';
        this.frame = 0;
        this.timer = 0;
        this.sound = new Audio();
        this.sound.src = './buzz.ogg'
    
    }

    update() {
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if (this.timer % 5 === 0 ){
            this.frame++;
        }
     
    }

    draw() {
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        
    }
}

window.addEventListener('click', function(e) {
  onClickCreateAnimation(e);
});

function onClickCreateAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 16){
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();