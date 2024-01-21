window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;
    let infectedCreatures = [];

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

    class InputHandler {
        constructor(){
            this.keys = [];
            //Add to array
            window.addEventListener('keydown', e => {
                if ((   e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowRight' ||
                        e.key === 'ArrowLeft')
                   && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
            });
            //Remove from array
            window.addEventListener('keyup', e => {
                if ((   e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowRight' ||
                        e.key === 'ArrowLeft')) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }

    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 144;
            this.height = 138;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.frameX = 0;
            this.maxFrame = 6;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.gravity = 2;
            this.fps = 3;
            this.frameTimer = 0;
            this.frameInterval = 1500/this.fps;

            this.maxHealth = 100;
            this.currentHealth = this.maxHealth;
        }

        draw(context){
            context.strokeStyle = 'white';
            context.beginPath();
            context.arc(this.x + this.width/3, this.y + this.height/2, this.width/2, 0, Math.PI *2);
            context.stroke();
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, infectedCreatures) {
            //collison detection
            infectedCreatures.forEach(infected => {
                const dx = infected.x - this.x;
                const dy = infected.y - this.y;
                const distance = Math.sqrt (dx* dx + dy * dy);
                if(distance < infected.width/2 + this.width/2){
                    this.takeDamage(infected.attackDamage);
                }

            });

            //Sprite animation
            if (this.frameTimer > this.frameInterval){
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                    this.frameTimer += deltaTime;
            }

            //Controls
            if (input.keys.indexOf('ArrowRight') > -1){
                this.speed=5;
            } else if(input.keys.indexOf('ArrowLeft') > -1){
                this.speed= -5;
            }  else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                this.vy -= 32;
            } else {
                this.speed = 0;
            }
            //Horizontal Movement
            this.x += this.speed;
            if (this.x< 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth -this.width;
            //Vertical movement
            this.y += this.vy;
            if (!this.onGround()){
                this.vy += this.gravity;
                this.width = 140;
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.frameY = 0;
            }
            if (this.y > this.gameHeight -this.height)this.y = this.gameHeight - this.height;
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
        updateHealth(amount) {
            this.currentHealth += amount;
            this.currentHealth = Math.max(0, Math.min(this.currentHealth, this.maxHealth));
        }
        takeDamage(amount) {
            this.currentHealth -= amount;
            this.currentHealth = Math.max(0, this.currentHealth); // Ensure health doesn't go below 0
        }


    }

    class Background{
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImageTest');
            this.x = 0;
            this.y = 0;
            this.width = 3735;
            this.height = 802;
            this.speed = 2;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.gameHeight);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.gameHeight);
        }
        update() {
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
    }

    class Infected {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
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


    class Herb {
        constructor(x, y, effect){
            this.x = x;
            this.y = y;
            this.effect = effect;
            this.type = type;
            //this.image  = ;
        }
        draw(ctx) {
            // Draw the herb on the canvas
            ctx.fillStyle = 'green'; // Example color
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10, 0, Math.PI * 2); // Example as a simple circle
            ctx.fill();
        }

        interact(player) {
            // Apply the effect to the player's health
            player.health += this.effect;
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
    function handleHerbCollection(player, herb){

    }

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
    const input = new InputHandler();
    const player = new Player (canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const infectedraccoon = new Infected(canvas.width, canvas.height);

    let lastTime = 0;
    let infectedTimer = 0;
    let infectedInterval = 2000;
    let randomInfectedInterval = Math.random() * 1000 + 500;
    let healthDecreaseRate = Math.floor(Math.random() * 4) + 1;


    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0,canvas.width, canvas.height);
        background.draw(ctx);
        //background.update();
        displayHealth (ctx, player);
        player.draw(ctx);
        player.update(input, deltaTime, infectedCreatures);
        player.updateHealth(-deltaTime / 7000 * healthDecreaseRate); 
        handleInfected(deltaTime);
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