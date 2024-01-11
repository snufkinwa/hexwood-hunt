//dropdown menu to see animations
let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image(); 
playerImage.src = './HexwoodHunt.png';
const spriteWidth = 36;
const spriteHeight = 32;


let gameFrame = 0;
let staggerFrames = 10; 
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'rising',
        frames: 3,
    },
    {
        name: 'falling',
        frames: 4,
    },
    {
        name: 'hurt',
        frames: 2,
    },
    {
        name: 'attack',
        frames: 5,
    },
    {
        name: 'herb',
        frames: 7,
    },
    {
        name: 'dead',
        frames: 5,
    },
    {
        name: 'walk',
        frames: 8,
    },
    {
        name: 'run',
        frames: 5,
    },
    {
        name: 'wrongherb',
        frames: 7,
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth,spriteHeight, 0, 0, spriteWidth, spriteHeight);
  
    gameFrame ++;
    requestAnimationFrame(animate);
};

animate();

