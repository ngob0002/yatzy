//Dice.js
class Dice {
    constructor(numberOfDice) {
        this.numberOfDice = numberOfDice;
        this.diceValues = new Array(numberOfDice).fill(1); // Initialize all dice to 1
    }

    roll() {
        this.diceValues = this.diceValues.map(() => this.getRandomNumber(1, 6));
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Export the Dice class/module
export default Dice;
