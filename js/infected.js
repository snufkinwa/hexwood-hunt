class Infected {
    constructor(game){
        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.width = 165;
        this.height = 130;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.image = document.getElementById('raccooninfected');
        this.frameX = 0;
        this.maxFrame = 20;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.speed = 4;
        this.markedforDeletion = false;
    }
    draw(context){
        context.strokeStyle = 'white';
        context.beginPath();
        context.arc(this.x + this.width/3, this.y + this.height/2, this.width/4, 2, Math.PI *2);
        context.stroke();
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        if (this.frameTimer > this.frameInterval){
        if(this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speed;

        //if(this.x)
    }
isOffScreen() {
    // Check if the object is outside the bounds of the canvas
    return this.x < 0 - this.width || this.x > canvas.width || this.y < 0 - this.height || this.y > canvas.height;
}
}

function handleInfected(deltaTime){
    if (infectedTimer > infectedInterval + randomInfectedInterval){
     infectedCreatures.push(new Infected(canvas.width, canvas.height));
     console.log(infectedCreatures);
     let randomInfectedInterval = Math.random() * 1000 + 500;
     infectedTimer = 0;
    } else {
     infectedTimer += deltaTime;
    }
     infectedCreatures.forEach(infected => {
         infected.draw(ctx);
         infected.update(deltaTime);
     // Filter the array to keep only the objects that are on-screen
     infectedCreatures = infectedCreatures.filter(infected => !infected.isOffScreen());
     })
 }