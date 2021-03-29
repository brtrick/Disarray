export class Die {
    constructor(letters) {
        this.letters = letters;
        this.top = this.letters[Math.floor(Math.random()*6)];
    }
}