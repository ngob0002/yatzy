class YatzyEngine {
  constructor() {
    //this.diceElements = diceElements;
    //this.die = []; //holds all dice objects
    //this.diceValues= []; //stores dce values in the form of int
    //create all dice objects for each dice element
    /*diceElements.forEach((element, index) => {
    this.die.push(new Dice((index + 1), element));
    this.diceValues.push(this.die[index].diceValue);
    });*/
   // this.die = [new Dice(1), new Dice(2), new Dice(3), new Dice(4), new Dice(5)];

    this.selectedDice = [];
    this.rollsLeft = 3; // Three rolls in total for each turn
    this.scoreTable = {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      TOAKscore: null,
      FOAKscore: null,
      fullHouseScoreValue: null,
      smallStraight: null,
      largeStraight: null,
      yahtzyScore: null,
      ChanceScore: null,
      TotalScore: 0,
    };
  }

  rollDice() {
    if (this.rollsLeft > 0) {
      diceObjects.forEach( (die, index) => {
        if (!this.selectedDice.includes(die)) {
          die.roll();
          diceValues[index] = die.diceValue;
        }
      });
      this.rollsLeft--;
    }
  }
//need to check what's happening here then edit one die click in game line 82 to reflect
  //issue is dice are selecting but not rolling
  selectDie(die) {
    if (this.rollsLeft < 3) {
      // Toggle the selection of dice
      if (this.selectedDice.includes(die)) {
        this.selectedDice = this.selectedDice.filter(d => d !== die);
      } else {
        this.selectedDice.push(die);
      }
    }
  }

  calculateScore(category, diceValues) {
    console.log(`Calculating score for category: ${category}`);

    // Check if the category is already scored to prevent re-scoring.
    if (this.scoreTable[category] !== null) {
        console.log(`Category "${category}" is already scored.`);

        return;
    }

    let score = 0;

    const solosToNumMap = new Map([
      ['ones', 1],
      ['twos', 2],
      ['threes', 3],
      ['fours', 4],
      ['fives', 5],
      ['sixes', 6]
  ]);

    // Implement the scoring rules for different categories.
    switch (category) {
      case 'ones':
      case 'twos':
      case 'threes':
      case 'fours':
      case 'fives':
      case 'sixes':
        score = this.calculateSumForNumber(diceValues, solosToNumMap.get(category));
        console.log(`calculated score is ${score}`);
        break;

      case 'TOAKscore':
            // Three of a kind: Check if there is at least one set of three dice with the same value.
            const threeOfAKindValue = this.findNOfAKind(diceValues, 3);
            score = threeOfAKindValue !== null ? threeOfAKindValue * 3 : 0;
            break;

      case 'FOAKscore':
        // Four of a kind: Check if there is at least one set of four dice with the same value.
        score = this.findNOfAKind(diceValues, 4) * 4; // Multiply by 4 to get the sum.
        break;

      case 'fullHouseScoreValue':
        // Full House: Score 25 if there are three of one kind and two of another kind.
        const counts = this.getDiceCounts(diceValues);
        const values = Object.values(counts);
        if (values.includes(3) && values.includes(2)) {
          score = 25;
        }
        break;

      case 'smallStraight':
        // Small Straight: Score 30 if there is a sequence of at least 4 unique dice values.
        score = this.checkStraight(diceValues, 4) ? 30 : 0;
        break;

      case 'largeStraight':
        // Large Straight: Score 40 if there is a sequence of 5 unique dice values.
        score = this.checkStraight(diceValues, 5) ? 40 : 0;
        break;

      case 'yahtzyScore':
        // Yahtzy: Score 50 if all dice show the same value.
        score = this.isYahtzy(diceValues) ? 50 : 0;
        break;

      case 'ChanceScore':
        // Chance: Score the sum of all dice.
        score = diceValues.reduce((acc, die) => acc + die, 0);
        break;

      default:
        console.log(`No scoring rules defined for category: ${category}`);
        break;
    }

    // Update the score in the score table.
    this.scoreTable[category] = score;
    console.log(`Score for ${category}: ${score}`);

    // Update the TotalScore in the score table.
    this.scoreTable.TotalScore += score;
    console.log(`Total Score: ${this.scoreTable.TotalScore}`);
}
    
  // Helper method to calculate the sum for a specific number (e.g., ones, twos, etc.).
  calculateSumForNumber(diceValues, number) {
    let total = 0;
    diceValues.forEach((element) => {
      if (element == number){
        total += number;
      }
      });
      console.log(`total is ${total}`);
      return total;

    //return diceValues.reduce((acc, die) => (die === number ? acc + die : acc), 0);
  }

  // Helper method to find N of a kind in diceValues.
  findNOfAKind(diceValues, n) {
    for (let i = 0; i < diceValues.length; i++) {
      if (diceValues.lastIndexOf(diceValues[i]) - diceValues.indexOf(diceValues[i]) >= n - 1) {
        return diceValues[i];
      }
    }
    return null;
  }

  // Helper method to get counts of each die value.
  getDiceCounts(diceValues) {
    const counts = {};
    for (const die of diceValues) {
      counts[die] = (counts[die] || 0) + 1;
    }
    return counts;
  }

  // Helper method to check if there is a straight of a certain length.
  checkStraight(diceValues, length) {
    const uniqueValues = [...new Set(diceValues)];
    if (uniqueValues.length >= length) {
      const sortedUniqueValues = uniqueValues.sort();
      for (let i = 0; i < sortedUniqueValues.length - 1; i++) {
        if (sortedUniqueValues[i] + 1 !== sortedUniqueValues[i + 1]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  // Helper method to check if all dice show the same value.
  isYahtzy(diceValues) {
    return diceValues.every(die => die === diceValues[0]);
  }
    
  isValidSelection(category, diceValues){
    switch (category) {
      case 'ones':
      case 'twos':
      case 'threes':
      case 'fours':
      case 'fives':
      case 'sixes':
        // For ones, twos, threes, fours, fives, and sixes,
        // check if the selected category matches the category being scored.
        return category === 'ones' || category === 'twos' || category === 'threes' ||
          category === 'fours' || category === 'fives' || category === 'sixes';

    case 'TOAKscore':
        // Three of a kind: Check if there is at least one set of three dice with the same value.
        return this.findNOfAKind(diceValues, 3) !== null;

    case 'FOAKscore':
        // Four of a kind: Check if there is at least one set of four dice with the same value.
        return this.findNOfAKind(diceValues, 4) !== null;

    case 'fullHouseScoreValue':
        // Full House: Check if there is a set of three dice with one value and a set of two dice with another value.
        const counts = {};
        for (const die of diceValues) {
          counts[die] = (counts[die] || 0) + 1;
        }
        const values = Object.values(counts);
        return values.includes(3) && values.includes(2);

    case 'largeStraight':
        // Large Straight: Check if the diceValues form a sequence of 5 unique dice values.
        const uniqueValues = [...new Set(diceValues)];
        if (uniqueValues.length === 5) {
          const sortedUniqueValues = uniqueValues.sort();
          return sortedUniqueValues[4] - sortedUniqueValues[0] === 4;
        }
        return false;

    case 'yahtzyScore':
        // Yahtzy: Check if all dice show the same value (i.e., a five-of-a-kind).
        return diceValues.every(die => die === diceValues[0]);

    case 'ChanceScore':
        // Chance: All selections are valid for Chance.
        return true;

    case 'TotalScore':
        // TotalScore: This is a special category for keeping track of the total score and not a category that can be selected by the player.
        // Return false to indicate that it cannot be selected.
        return false;

    default:
        // Handle other categories or custom scoring rules.
        return false; // By default, assume the selection is invalid.
    }
  }

  checkAllCategories(diceValues) {
    const validCategories = {};
    for (const category in this.scoreTable) {
      if (category !== 'TotalScore') {
        validCategories[category] = this.isValidSelection(category, diceValues);
      }
    }
    return validCategories;
  }


     
  resetScoreCard() {
    for (const category in this.scoreTable) {
      this.scoreTable[category] = null;
    }
    this.scoreTable.TotalScore = 0;
  }
}


// Example usage:
//const dice = new Dice(5); // If you have 5 dice
//const yatzyGame = new YatzyEngine();
//const diceValues = [1, 1, 2, 3, 4];
/*const validCategories = yatzyGame.checkAllCategories(diceValues);
console.log(validCategories);

// Now, you can iterate over the validCategories and calculate the score for each valid category.
for (const category in validCategories) {
  if (validCategories[category]) {
    yatzyGame.calculateScore(category, diceValues);
  }
}*/
