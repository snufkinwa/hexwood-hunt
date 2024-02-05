const states = [
    RACCOONIDLE = 0,
    RACCOONJUMP = 1,
    RACCOONATTACK = 2,
    RABBITIDLE = 3,
    RABBITJUMP = 4,
    RABBITATTACK = 5
]

class State {
    constructor(state) {
        this.state = state;
}
}

export class RaccoonIdle extends  State {
    constructor(infected){
        super('RACCOONIDLE');
        this.infected = infected;
    }
    enter(){

    }
    update(deltaTime){

    }
}

export class RaccoonJump extends  State {
    constructor(infected){
        super('RACCOONJUMP');
        this.infected = infected;
    }
    enter(){

    }
    update(deltaTime){

    }
}

export class RaccoonAttack extends  State {
    constructor(infected){
        super('RACCOONATTACK');
        this.infected = infected;
    }
    enter(){

    }
    update(deltaTime){
        
    }
}