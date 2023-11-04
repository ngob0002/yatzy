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
        if (category === 'ones' || category === 'twos' || category === 'threes' || category === 'fours' || category === 'fives' || category === 'sixes') {
            return this.calculateCategory(category, diceValues);
        } else if (category === 'threeOfAKind' && this.isThreeOfAKind(diceValues)) {
            return diceValues.reduce((sum, dice) => sum + dice, 0);
        } else if (category === 'fourOfAKind' && this.isFourOfAKind(diceValues)) {
            return diceValues.reduce((sum, dice) => sum + dice, 0);
        } else if (category === 'fullHouse' && this.isFullHouse(diceValues)) {
            return 25;
        } else if (category === 'smallStraight' && this.isSmallStraight(diceValues)) {
            return 30;
        } else if (category === 'largeStraight' && this.isLargeStraight(diceValues)) {
            return 40;
        } else if (category === 'chance') {
            return diceValues.reduce((sum, dice) => sum + dice, 0);
        } else if (category === 'yatzy' && this.isYatzy(diceValues)) {
            return 50;
        } else if (category === 'bonus') {
            // Calculate the sum of "Ones" through "Sixes"
            const sumOnesToSixes = this.calculateCategory('ones', diceValues) + this.calculateCategory('twos', diceValues) + this.calculateCategory('threes', diceValues) + this.calculateCategory('fours', diceValues) + this.calculateCategory('fives', diceValues) + this.calculateCategory('sixes', diceValues);
            return sumOnesToSixes >= 63 ? 35 : 0;
        } else if (category === 'totalScore') {
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
