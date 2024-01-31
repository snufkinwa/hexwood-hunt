import Player from './player.js';
import InputHandler from './input.js';
import Background  from './background.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;
    //let infectedCreatures = [];

    // let textIndex = 0;
    // const cutsceneText = [
    //     "   ",
    //     "   ",
    //     "Welcome to Hexwood. ",
    //     "As an orphaned herbalist, you find your fate intertwined with the ancient, foreboding woods known as Hexwood.",
    //     "After an unexpected encounter at the forest's edge, where a mysterious creature leaves its mark upon you, your life  takes a dramatic turn.",
    //     "Amidst the dense foliage and lurking shadows, you must navigate a world filled with dangers untold.",
    //     "Your survival depends on choosing the right herbs. Consume wisely to keep the illness at bay, or risk falling prey to the forest's curse.",
    //     "The hunt begins...",
    //     ""

    // ];

    // function drawMultilineText(ctx, text, x, y, lineHeight) {
    //     const words = text.split(' ');  // Splitting text into words
    //     let line = '';
    //     let lines = [];
    
    //     words.forEach(word => {
    //         if ((line + word).split(' ').length > 12) {
    //             lines.push(line);
    //             line = '';
    //         }
    //         line += word + ' ';
    //     });
    
    //     if (line.length > 0) {
    //         lines.push(line);
    //     }
    
    //     for (let i = 0; i < lines.length; i++) {
    //         ctx.fillText(lines[i], x, y + (i * lineHeight));
    //     }
    // }
    // function displayText() {
    //     if (textIndex < cutsceneText.length) {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    //         ctx.fillStyle = 'white';
    //         ctx.font = '24px Fude';
    //         drawMultilineText(ctx, cutsceneText[textIndex], 150, canvas.height* 0.5, 30); // x, y, lineHeight
    //         //ctx.fillText(cutsceneText[textIndex], 100, canvas.height / 2);
    //         textIndex++;
    //     }
    // }

    // setInterval(displayText, 5000); // Change text every 5 seconds

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 100;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();

        }

        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

        }
        draw(context){
            this.background.drawLayersUpTo(context, 4); // For example, draw up to layer2

            // Draw the player
            this.player.draw(context);
        
            // Draw the remaining background layers
            this.background.drawLayersFrom(context, 4); 
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function displayHealth(context, player) {
        const healthBarWidth = 200; // Width of the health bar
        const healthBarHeight = 20; // Height of the health bar
        const healthBarX = 10; // X position of the health bar
        const healthBarY = 10; // Y position of the health bar
    
        // Draw the background of the health bar
        context.fillStyle = 'grey';
        context.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
        const currentHealthWidth = (player.currentHealth / player.maxHealth) * healthBarWidth;

        // Draw the current health
        context.fillStyle = 'red';
        context.fillRect(healthBarX, healthBarY, currentHealthWidth, healthBarHeight);

        // Optionally, add a border to the health bar
        context.strokeStyle = 'black';
        context.strokeRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    }

     let lastTime = 0;
    // let infectedTimer = 0;
    // let infectedInterval = 2000;
    // let randomInfectedInterval = Math.random() * 1000 + 500;
     let healthDecreaseRate = Math.floor(Math.random() * 4) + 1;


    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0,canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        displayHealth(ctx, game.player);
        game.player.updateHealth(-deltaTime / 7000 * healthDecreaseRate); 
        requestAnimationFrame(animate);

    }
    animate(0);

    // setTimeout(function() {
    //     var loadingScreen = document.getElementById('loadingScreen');
    //     if (loadingScreen) {
    //         loadingScreen.style.display = 'none';
    //     }
    // }, 16000);

});