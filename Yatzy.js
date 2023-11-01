class Dice {
  constructor() {
    this.value = 0;
  }

  roll() {
    this.value = Math.floor(Math.random() * 6) + 1;
  }
}


class YatzyEngine {
  constructor() {
    this.dice = [new Dice(), new Dice(), new Dice(), new Dice(), new Dice()];
    this.selectedDice = [];
    this.scoreCard = {
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
    this.dice.forEach(die => {
      die.roll();
    });
  }

  selectDie(die) {
    if (this.selectedDice.includes(die)) {
      const index = this.selectedDice.indexOf(die);
      if (index !== -1) {
        this.selectedDice.splice(index, 1);
      }
    } else {
      this.selectedDice.push(die);
    }
  }

  updateScoreCard(category, value) {
    this.scoreCard[category] = value;
  }
}
class YatzyGame {
  constructor() {
    this.currentPlayer = 1;
    this.currentRound = 1;
    this.totalScore = 0;
    this.yatzyEngine=new YatzyEngine();
    
  }
  startNewGame() {
    this.currentPlayer = 1;
    this.currentRound = 1;
    this.totalScore = 0;
 this.yatzyEngine.resetScoreCard();
    // You may need to reset other game-related data or UI elements here.
  } 
  endTurn() {
        if (this.current_player === 1) {
            this.current_player = 2;
        } else {
            this.current_player = 1;
            this.current_round += 1;
        }
  }
 
  endGame() {
        let winner = "";
        let player1_score = this.yatzy_engine.getTotalScore();
        
        if (this.current_round >13){
          let player2_score = yatzy_engine.getTotalScore();
          if (player1_score > player2_score) {
              winner = "Player 1 wins!";
          } else if (player2_score > player1_score) {
              winner = "Player 2 wins!";
          } else {
              winner = "It's a tie!";
          }
              
          console.log(winner);
        }
    }
}  
    
document.addEventListener('DOMContentLoaded', function () {
  const diceElements = document.querySelectorAll('.die');
  const rollButton = document.getElementById('roll-button');
  const scoreButton = document.getElementById('score-button');
  const yatzyEngine = new YatzyEngine();

  diceElements.forEach((die, index) => {
    die.addEventListener('click', function () {
      die.classList.toggle('selected');
      const diceValue = yatzyEngine.dice[index].value;

      if (die.classList.contains('selected')) {
        yatzyEngine.selectDie(diceValue);
      } else {
        yatzyEngine.selectDie(diceValue);
      }
    });
  });

  rollButton.addEventListener('click', onRollButtonClick);

  function onRollButtonClick() {
    yatzyEngine.rollDice();
    updateDiceDisplay();
    updateScoreCardDisplay();
  }

  function updateDiceDisplay() {
    const diceValues = yatzyEngine.dice.map(die => die.value);
    diceElements.forEach((die, index) => {
      die.style.backgroundPositionX = `${(diceValues[index] - 1) * -100}px`;
    });
  }

  scoreButton.addEventListener('click', onScoreButtonClick);

  function onScoreButtonClick() {
    calculateAndSetScore();
    updateScoreCardDisplay();
     if (yatzyEngine.currentRound > 13) {
        yatzyGame.endGame();
    }
  }

  function calculateAndSetScore() {
    // Calculate the score for the "Ones" category
    const onesScore = calculateScoreForCategory(1, yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('ones', onesScore);
   

    // Calculate and update other categories in a similar way
    const twosScore = calculateScoreForCategory(2, yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('twos', twosScore);

    const threesScore = calculateScoreForCategory(3, yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('threes', threesScore);

    const foursScore = calculateScoreForCategory(4, yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('fours', foursScore);

    const fivesScore = calculateScoreForCategory(5, yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('fives', fivesScore);

    const sixesScore = calculateScoreForCategory(6, yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('sixes', sixesScore);

    // Implement scoring logic for "Three of a Kind"
    const TOAKscore = calculateThreeOfAKind(yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('TOAKscore', TOAKscore);

    // Implement scoring logic for "Four of a Kind"
    const FOAKscore = calculateFourOfAKind(yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('FOAKscore', FOAKscore);

    // Implement scoring logic for "Full House"
    const fullHouseScoreValue = calculateFullHouse(yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('fullHouseScoreValue', fullHouseScoreValue);

    // Implement scoring logic for "Small Straight"
    const smallStraight = calculateSmallStraight(yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('smallStraight', smallStraight);

    // Implement scoring logic for "Large Straight"
    const largeStraight = calculateLargeStraight(yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('largeStraight', largeStraight);

    // Implement scoring logic for "Yatzy"
    const yahtzyScore = calculateYahtzy(yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('yahtzyScore', yahtzyScore);

    // Implement scoring logic for "Chance"
    const ChanceScore = calculateChance(yatzyEngine.selectedDice);
    yatzyEngine.updateScoreCard('ChanceScore', ChanceScore);

    // Calculate and update the "Total Score"
    const TotalScore = calculateTotalScore(yatzyEngine.scoreCard);
    yatzyEngine.updateScoreCard('TotalScore', TotalScore);
  }

  function calculateScoreForCategory(category, diceValues) {
    return diceValues.reduce((sum, value) => (value === category ? sum + category : sum), 0);
  }

  function calculateThreeOfAKind(diceValues) {
    // Scoring logic for "Three of a Kind"
    // If there are three or more dice with the same value, return the sum of all dice.
    // Otherwise, return 0.
    const counts = {};
    diceValues.forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
    for (const value in counts) {
      if (counts[value] >= 3) {
        return diceValues.reduce((sum, val) => sum + val, 0);
      }
    }
    return 0;
  }

  function calculateFourOfAKind(diceValues) {
    // Scoring logic for "Four of a Kind"
    // If there are four or more dice with the same value, return the sum of all dice.
    // Otherwise, return 0.
    const counts = {};
    diceValues.forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
    for (const value in counts) {
      if (counts[value] >= 4) {
        return diceValues.reduce((sum, val) => sum + val, 0);
      }
    }
    return 0;
  }

  function calculateFullHouse(diceValues) {
    // Scoring logic for "Full House"
    // If there are three dice with the same value and two dice with another value, return 25.
    // Otherwise, return 0.
    const counts = {};
    diceValues.forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
    const values = Object.values(counts);
    if (values.includes(2) && values.includes(3)) {
      return 25;
    }
    return 0;
  }

  function calculateSmallStraight(diceValues) {
    // Scoring logic for "Small Straight"
    // If there is a sequence of four or more consecutive values, return 30.
    // Otherwise, return 0.
    const uniqueValues = [...new Set(diceValues)].sort();
    for (let i = 0; i < uniqueValues.length - 3; i++) {
      if (uniqueValues[i] + 3 === uniqueValues[i + 3]) {
        return 30;
      }
    }
    return 0;
  }

  function calculateLargeStraight(diceValues) {
    // Scoring logic for "Large Straight"
    // If there is a sequence of five consecutive values, return 40.
    // Otherwise, return 0.
    const uniqueValues = [...new Set(diceValues)].sort();
    if (uniqueValues.length === 5 && uniqueValues[4] - uniqueValues[0] === 4) {
      return 40;
    }
    return 0;
  }

  function calculateYahtzy(diceValues) {
    // Scoring logic for "Yatzy"
    // If all dice have the same value, return 50.
    // Otherwise, return 0.
    const uniqueValues = [...new Set(diceValues)];
    if (uniqueValues.length === 1) {
      return 50;
    }
    return 0;
  }

  function calculateChance(diceValues) {
    // Scoring logic for "Chance"
    // Return the sum of all dice.
    return diceValues.reduce((sum, val) => sum + val, 0);
  }

  function calculateTotalScore(scoreCard) {
    // Scoring logic for "Total Score"
    // Sum all the scores in the scoreCard object.
    return Object.values(scoreCard).reduce((total, score) => total + (score || 0), 0);
  }

  function updateScoreCardDisplay() {
    // Update the HTML input fields with the calculated scores
    for (const category in yatzyEngine.scoreCard) {
      document.getElementById(category).value = yatzyEngine.scoreCard[category] || 0;
    }
  }
});
