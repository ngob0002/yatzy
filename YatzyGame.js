// YatzyGame.js
class YatzyGame {
    constructor() {
        this.currentRound = 1;
        this.currentTrial = 1;
        this.totalScore = 0;
        this.totalRounds = 13;
        this.numberOfDice = 5;
        this.rolledDiceValues = [];
        this.currentRoll = 0;
        this.availableCombinations = [
            'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
            'threeOfAKind', 'fourOfAKind', 'fullHouse',
            'smallStraight', 'largeStraight', 'chance', 'yatzy'
        ];
        this.turns = 0; // Reset the turns at the start of a new game.
        this.rollButton = rollButton; // Store the roll button element.
    
    }

    startNewGame() {
       
        this.currentRound = 1;
        this.currentTrial = 1;
        this.totalScore = 0;
        this.rolledDiceValues = [];
        this.currentRoll = 0;
        this.availableCombinations = [
            'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
            'threeOfAKind', 'fourOfAKind', 'fullHouse',
            'smallStraight', 'largeStraight', 'chance', 'yatzy'
        ];
        this.turns = 0; // Reset the turns at the start of a new game.
        this.rollButton.disabled = false; // Enable the roll button when starting a new game.
    }
    
    rollDice() {
        if (this.currentRoll >= 3) {
            console.log('You have used up all your rolls for this turn.');
            return;
        }

        this.rolledDiceValues = [];
        for (let i = 0; i < this.numberOfDice; i++) {
            this.rolledDiceValues.push(this.getRandomNumber(1, 6));
        }

        this.currentRoll++;
        this.turns++; // Increment the turns at each roll.
        
        if (this.turns >= 3) {
            // Disable the roll button after three rolls in a round.
            rollButton.disabled = true;
        }
    }

    toggleSelectedDie(dieIndex) {
        if (this.currentRoll >= 3) {
            console.log('You have used up all your rolls for this turn.');
            return;
        }

        // Implement logic to select and hold dice for re-rolling.
        if (this.selectedDiceToReroll.includes(dieIndex)) {
            const index = this.selectedDiceToReroll.indexOf(dieIndex);
            this.selectedDiceToReroll.splice(index, 1);
        } else {
            this.selectedDiceToReroll.push(dieIndex);
        }
    }

    rerollSelectedDice() {
        if (this.currentRoll >= 3) {
            console.log('You have used up all your rolls for this turn.');
            return;
        }

        // Implement logic to re-roll selected dice.
        for (const dieIndex of this.selectedDiceToReroll) {
            this.rolledDiceValues[dieIndex] = this.getRandomNumber(1, 6);
        }

        this.currentRoll++;
    }

    updateScore(score) {
        this.totalScore += score;
        if (this.currentTrial === 3) {
            this.currentTrial = 1;
            this.currentRound++;
        } else {
            this.currentTrial++;
        }
    }


    selectCombinationFromScorecard(combination) {
        if (this.currentRoll === 3) {
            if (this.availableCombinations.includes(combination)) {
                const score = yatzyEngine.calculateScore(combination, this.rolledDiceValues);
                this.updateScore(score);
                
                // Update the score in the corresponding input field
                const inputField = document.getElementById(combination);
                inputField.value = score;
    
                const index = this.availableCombinations.indexOf(combination);
                this.availableCombinations.splice(index, 1);
                
                // End the game after 13 rounds
                if (this.currentRound > this.totalRounds) {
                    this.endGame();
                }
            } else {
                alert("Invalid combination selected.");
            }
        } else {
            alert("You must complete three rolls before selecting a combination.");
        }
    }
    

    endGame() {
        console.log(`Game Over! Your total score is ${this.totalScore}`);
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Example usage:
const rollButton = document.getElementById('roll-button'); // Get the roll button element
const yatzyGame = new YatzyGame(rollButton);
yatzyGame.startNewGame();
