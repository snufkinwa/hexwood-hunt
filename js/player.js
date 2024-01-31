import { Idle, Walking, Running, Jumping, Falling, Attack } from "./playerStates.js";

export default class Player {
    constructor(game){
        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.width = 144;
        this.height = 120;
        this.x = 0;
        this.y = this.gameHeight - this.height - this.game.groundMargin;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6;
        this.speed = 0;
        this.maxSpeed = 25;
        this.vy = 0;
        this.gravity = 2;
        this.fps = 15;
        this.frameTimer = 0;
        this.frameInterval = 1500/this.fps;
        this.states = [
            new Idle(this),
            new Walking(this),
            new Running(this),
            new Jumping (this),
            new Falling(this),
            new Attack(this)
        ];
        this.currentState = this.states[0];
        this.currentState.enter();

        this.maxHealth = 100;
        this.currentHealth = this.maxHealth;
    }

    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input, deltaTime) {
        this.currentState.handleInput(input);
        // //collison detection
        // infectedCreatures.forEach(infected => {
        //     const dx = infected.x - this.x;
        //     const dy = infected.y - this.y;
        //     const distance = Math.sqrt (dx* dx + dy * dy);
        //     if(distance < infected.width/2 + this.width/2){
        //         this.takeDamage(infected.attackDamage);
        //     }

        // });

        //Sprite animation
        if (this.frameTimer > this.frameInterval){
            if(this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
                this.frameTimer += deltaTime;
        }
        //Controls
        if (input.includes('ArrowRight'))
            this.speed = this.maxSpeed;
         else if(input.includes('ArrowLeft'))
            this.speed = -this.maxSpeed;
          //else if(input.includes('ArrowUp') && this.onGround())
             //this.vy -= 32;
        else this.speed = 0;

        //Horizontal Movement
        this.x += this.speed;
        if (this.x< 0) this.x = 0;
        else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth -this.width;
        //Vertical movement
        this.y += this.vy;
  // Apply gravity if the player is not on the ground
          if (!this.onGround()) {
        this.vy += this.gravity;
        } else {
    // Reset vertical velocity and adjust position if on the ground
        this.vy = 0;
        this.y = this.gameHeight - this.height - this.game.groundMargin; // Ensures the player is exactly on the ground
        }
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    onGround(){
        return this.y >= this.gameHeight - this.height - this.game.groundMargin;
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