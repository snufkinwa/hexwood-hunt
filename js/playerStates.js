const states = {
    IDLE: 0,
    WALKING: 1,
    RUNNING: 2,
    JUMPING: 3,
    FALLING: 4,
    ATTACK: 5,
    EATING: 6,
    HURT: 7,
    DEATH:8
}

class State {
    constructor(state) {
        this.state = state;
}
}

export class Idle extends State {
    constructor(player){
        super('IDLE');
        this.player= player;
    }
    enter(){
        this.player.frameY = 0;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if (input.includes ('ArrowLeft') || input.includes ('ArrowRight')){
            this.player.setState(states.WALKING, 2);
        }
        if (input.includes('ArrowUp') && this.player.onGround()) {
            this.player.setState(states.JUMPING, 1);
        }
        if (input.includes(' ')) {
            this.player.setState(states.ATTACK, 2);
        }
        if (input.includes('q')) {
            this.player.setState(states.ATTACK, 2);
        }
    }
}

export class Walking extends State {
    constructor(player){
        super('WALKING');
        this.player= player;
    }
    enter(){
        this.player.frameY = 5;
        this.player.maxFrame = 7;

    }
    handleInput(input) {
        // Check if Shift and either ArrowLeft or ArrowRight are pressed
        if (input.includes('Shift') && (input.includes('ArrowLeft') || input.includes('ArrowRight'))) {
            this.player.setState(states.RUNNING, 3);
        } else if (!input.includes('ArrowLeft') && !input.includes('ArrowRight')) {
            // If neither ArrowLeft nor ArrowRight are pressed, switch to IDLE
            this.player.setState(states.IDLE, 0);
        } else if (input.includes('ArrowUp') && this.player.onGround()) {
            this.player.setState(states.JUMPING, 1);
        // If only ArrowLeft or ArrowRight are pressed, stay in WALKING state
    }
}
}


export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }
    enter() {
        this.player.frameY = 6;
        this.player.maxFrame = 4;
    }
    handleInput(input) {
        if (!input.includes('Shift') || (!input.includes('ArrowLeft') && !input.includes('ArrowRight'))) {
            this.player.setState(states.IDLE, 0);
        }
}
}


export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player= player;
    }
    enter(){
        if (this.player.onGround()) {
            this.player.vy = -32; // Or any other value representing the jump strength
        }
        this.player.frameY = 1;
        this.player.maxFrame = 2;

    }
    handleInput(input){
        if (this.player.vy > this.player.gravity){
            this.player.setState(states.FALLING, 1);
        }
        }
}


export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player= player;
    }
    enter(){
        this.player.frameY = 2;
        this.player.maxFrame = 3;

    }
    handleInput(input){
        if (this.player.onGround()) {
            this.player.setState(states.IDLE, 0); // or states.WALKING based on other conditions
        }
        }
}

export class Eating extends State {
    constructor(player) {
        super('EATING');
        this.player = player;
        this.herbType = null; // Will be set when a herb is eaten
    }

    enter(herbType) {
        this.herbType = herbType;
        this.player.frameY = this.getFrameForHerb(herbType);

        // Apply effects based on herb type
        if (herbType === 'good') {
            // Apply good herb effects
        } else if (herbType === 'bad') {
            // Apply bad herb effects
        }
    }

    getFrameForHerb(herbType) {
        // Return the appropriate frame based on the herb type
        if (herbType === 'good') {
            return /* frame for eating good herb */;
        } else if (herbType === 'bad') {
            return /* frame for eating bad herb */;
        }
    }

    handleInput(input) {
        // Logic to exit this state, e.g., after a certain time or animation completes
    }
}


export class Attack extends State {
    constructor(player){
        super('ATTACK');
        this.player= player;
    }
    enter(){
        this.player.frameY = 4;
        this.player.maxFrame = 4;
        this.player.frameX = 0; // Reset to the start of the attack animation
    }

    handleInput(input) {
        // Transition out of attack state based on animation or other conditions
        if (this.player.frameX >= this.player.maxFrame) {
            this.player.setState(states.IDLE, 0); // or any other appropriate state
        }
    }
}

export class Hurt extends State {
    constructor(player){
        super('HURT');
        this.player= player;
    }
    enter(){
        this.player.frameY = 3;
        this.player.maxFrame = 2;

    }
    handleInput(input){
        if (this.player.onGround()) {
            this.player.setState(states.IDLE, 0); // or states.WALKING based on other conditions
        }
        }
}

export class Death extends State {
    constructor(player){
        super('DEATH');
        this.player= player;
    }
    enter(){
        this.player.frameY = 9;
        this.player.maxFrame = 5;
    }
    handleInput(input){
        if (this.player.onGround()) {
            this.player.setState(states.IDLE, 0); // or states.WALKING based on other conditions
        }
        }
}

