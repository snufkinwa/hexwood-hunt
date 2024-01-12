const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
let gameFrame = 0;

const CANVAS_WIDTH = canvas.width = 1240;
const CANVAS_HEIGHT = canvas.height = 720;
let gameSpeed = 5;

//importing background layers
const backgroundLayer1 = new Image();
backgroundLayer1.src = './1280x720/1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './1280x720/2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './1280x720/3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './1280x720/4.png';

window.addEventListener('load', function(){
//Experiment with speedModifier
const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function(e){
    // console.log(e.target.value);
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
});

//Helps project be dynamic by adding an object to hold layers
class Layer{
    constructor(image, speedModifier){
        this.x= 0;
        this.y=0;
        this.width = 1280;
        this.height = 720;
        this.image = image; 
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update(){
        this.speed= gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = 0;
        }
        this.x = this.x - this.speed;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.5);
const layer2 = new Layer(backgroundLayer2, 0.5);
const layer3 = new Layer(backgroundLayer3, 0.5);
const layer4 = new Layer(backgroundLayer4, 1);

const gameObjects =[layer1, layer2, layer3, layer4]

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH,CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    })
    requestAnimationFrame(animate);
};
animate();
} );

