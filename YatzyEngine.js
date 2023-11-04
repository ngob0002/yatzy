class YatzyEngine {
    constructor() {
      this.scoreTable = {
        ones: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,
        threeOfAKind: null,
        fourOfAKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        chance: null,
        yatzy: null,
      };
    }
  
    calculateScore(category, diceValues) {
        let score = 0;
    
        switch (category) {
            case "ones":
                score = this.calculateCategoryScore(1, diceValues);
                break;
            case "twos":
                score = this.calculateCategoryScore(2, diceValues);
                break;
            case "threes":
                score = this.calculateCategoryScore(3, diceValues);
                break;
            case "fours":
                score = this.calculateCategoryScore(4, diceValues);
                break;
            case "fives":
                score = this.calculateCategoryScore(5, diceValues);
                break;
            case "sixes":
                score = this.calculateCategoryScore(6, diceValues);
                break;
            case "threeOfAKind":
                if (this.hasNOfAKind(diceValues, 3)) {
                    score = diceValues.reduce((sum, dice) => sum + dice, 0);
                }
                break;
            case "fourOfAKind":
                if (this.hasNOfAKind(diceValues, 4)) {
                    score = diceValues.reduce((sum, dice) => sum + dice, 0);
                }
                break;
            case "fullHouse":
                if (this.isFullHouse(diceValues)) {
                    score = 25;
                }
                break;
            case "smallStraight":
                if (this.isSmallStraight(diceValues)) {
                    score = 30;
                }
                break;
            case "largeStraight":
                if (this.isLargeStraight(diceValues)) {
                    score = 40;
                }
                break;
            case "chance":
                score = diceValues.reduce((sum, dice) => sum + dice, 0);
                break;
            case "yatzy":
                if (this.hasNOfAKind(diceValues, 5)) {
                    score = 50;
                }
                break;
            default:
                console.error("Invalid category: " + category);
        }
    
        this.scoreTable[category] = score;
        return score;
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
      switch (category) {
        case "ones":
        case "twos":
        case "threes":
        case "fours":
        case "fives":
        case "sixes":
          return true;
        case "threeOfAKind":
          return this.isThreeOfAKind(diceValues);
        case "fourOfAKind":
          return this.isFourOfAKind(diceValues);
        case "fullHouse":
          return this.isFullHouse(diceValues);
        case "smallStraight":
          return this.isSmallStraight(diceValues);
        case "largeStraight":
          return this.isLargeStraight(diceValues);
        case "chance":
          return true;
        case "yatzy":
          return this.isYatzy(diceValues);
      }
    }
  
    isThreeOfAKind(diceValues) {
      return this.getMatchingDiceCount(diceValues) >= 3;
    }
  
    isFourOfAKind(diceValues) {
      return this.getMatchingDiceCount(diceValues) >= 4;
    }
  
    isFullHouse(diceValues) {
      const counts = this.getDiceCounts(diceValues);
      return Object.values(counts).includes(2) && Object.values(counts).includes(3);
    }
  
}  
