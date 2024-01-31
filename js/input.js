export default class InputHandler {
    constructor(){
        this.keys = [];
        console.log(this .key);
        //Add to array
        window.addEventListener('keydown', e => {
            if ((   e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowLeft'||
                    e.key === 'Shift'||
                    e.key === 'q'||
                    e.key === ' ')
               && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            console.log(e.key, this.keys);
        });
        //Remove from array
        window.addEventListener('keyup', e => {
            if ((   e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowLeft'||
                    e.key === 'Shift'||
                    e.key === 'q'||
                    e.key === ' ')) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys);
        });
    }

}