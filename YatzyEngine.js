// YatzyEngine.js
class YatzyEngine {
    constructor() {
        this.scoreTable = {
            Ones: null,
            Twos: null,
            Threes: null,
            Fours: null,
            Fives: null,
            Sixes: null,
            ThreeOfAKind: null,
            FourOfAKind: null,
            FullHouse: null,
            SmallStraight: null,
            LargeStraight: null,
            Yatzy: null,
            Chance: null,
            Bonus: null,
            TotalScore: null,
        };
    }

    calculateScore(category, diceValues) {
        const categoryScore = this.calculateCategoryScore(category, diceValues);
        if (categoryScore !== null && this.scoreTable[category] === null) {
            this.scoreTable[category] = categoryScore;
            return categoryScore;
        }
        return -1; // Invalid or already scored category
    }

    calculateCategoryScore(category, diceValues) {
        // Example scoring logic for the 'Ones' category (add more categories)
        if (category === 'Ones') {
            return diceValues.filter(value => value === 1).length;
        }
        // Implement scoring logic for other categories
        if (category === 'Twos') {
            return diceValues.filter(value => value === 2).length;
        }
        if (category === 'Threes') {
            return diceValues.filter(value => value === 3).length;
        }
        if (category === 'Fours') {
            return diceValues.filter(value => value === 4).length;
        }
        if (category === 'Fives') {
            return diceValues.filter(value => value === 5).length;
        }
        if (category === 'Sixes') {
            return diceValues.filter(value => value === 6).length;
        }
        if (this.hasNOfAKind(diceValues, 3)) {
            return diceValues.reduce((sum, dice) => sum + dice, 0);
        }
        if (this.hasNOfAKind(diceValues, 4)) {
            return diceValues.reduce((sum, dice) => sum + dice, 0);
        }
        if (this.isFullHouse(diceValues)) {
            return 25;
        }
        if (this.isSmallStraight(diceValues)) {
            return 30;
        }
        if (this.isLargeStraight(diceValues)) {
            return 40;
        }
        if (this.hasNOfAKind(diceValues, 5)) {
            return 50;
        }
        if (category === 'Chance') {
            // Calculate the sum of all dice
            return diceValues.reduce((sum, dice) => sum + dice, 0);
        }
         // Bonus
    const sumOnesToSixes = this.calculateSum(diceValues, 1) + this.calculateSum(diceValues, 2) + this.calculateSum(diceValues, 3) + this.calculateSum(diceValues, 4) + this.calculateSum(diceValues, 5) + this.calculateSum(diceValues, 6);
    if (category === 'Bonus' && sumOnesToSixes >= 63) {
        return 35;
    }

    if (category === 'Total Score') {
        // Calculate the total score for all categories
        let totalScore = 0;
        for (const key in this.scoreTable) {
            if (this.scoreTable[key] !== null) {
                totalScore += this.scoreTable[key];
            }
        }
        return totalScore;
    }
        return null; // Default: category not implemented
    }

    isValidSelection(category, diceValues) {
        // Example validation for the 'Ones' category (add more categories)
        if (category === 'Ones') {
            // Check if there are at least one '1' in the dice values
            return diceValues.includes(1);
        }
        // Implement validation for other categories
        if (category === 'Twos') {
            // Check if there are at least one '2' in the dice values
            return diceValues.includes(2);
        }
        if (category === 'Threes') {
            // Check if there are at least one '3' in the dice values
            return diceValues.includes(3);
        }
        if (category === 'Fours') {
            // Check if there are at least one '4' in the dice values
            return diceValues.includes(4);
        }
        if (category === 'Fives') {
            // Check if there are at least one '1' in the dice values
            return diceValues.includes(5);
        }
        if (category === 'Sixes') {
            // Check if there are at least one '1' in the dice values
            return diceValues.includes(6);
        }
        if (category === 'ThreeOfAKind') {
        return this.hasNOfAKind(diceValues, 3);
        }
        if (category === 'FourOfAKind') {
            return this.hasNOfAKind(diceValues, 4);
        }
        if (category === 'FullHouse') {
            return this.hasNOfAKind(diceValues);
        }
        if (category === 'SmallStraight') {
            return this.isSmallStraight(diceValues);
        } 
        if (category === 'LargeStraight') {
            return this.isLargeStraight(diceValues);
        }
        if (category === 'Yatzy') {
            return this.hasNOfAKind(diceValues, 5);
        }
        if (category === 'Chance') {
            return true;
        }
        if (category === 'Bonus') {
            return false;
        }
        if (category === 'Total Score') {
            return true; // The 'Total Score' category is always valid.
        }
        // For example, 'Twos', 'Threes', 'Four of a Kind', 'Full House', etc.
        return false; // Default: category not implemented or invalid
    }
}

// Export the YatzyEngine class/module
export default YatzyEngine;
