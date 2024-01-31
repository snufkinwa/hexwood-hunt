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