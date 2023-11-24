
const diceElements = document.querySelectorAll(".die");
const diceObjects = []; //holds all dice objects
const diceValues = []; //holds all values in the form of int
diceElements.forEach((element, index) => {
  diceObjects.push(new Dice((index + 1), element));
});

class YatzyGame {
  constructor() {
    this.currentRound = 1;
    this.totalScore = 0;
    this.maxRounds = 13; // 13 rounds in Yatzy
    this.maxTurnsPerRound = 3; // 3 turns per round
    this.yatzyEngine = new YatzyEngine();
    this.startNewGame();
    //diceElements = document.querySelectorAll(".die");
   
    // Corrected definition using arrow function syntax
    this.calculateAndSetScore = (category, index) => {
      // Perform the calculation and set the score based on the selected category
      //const diceValues = this.yatzyEngine.die.map(die => die.value);
      const diceValue = diceValues[index];

    this.yatzyEngine.calculateScore(category, diceValues);
    };

    diceElements.forEach((die, index) => {
      die.addEventListener('click', () => this.onDieClick(index));
    });

    const rollButton = document.getElementById('roll-button');
    const scoreButton = document.getElementById('score-button');

    rollButton.addEventListener('click', () => this.onRollButtonClick());
    scoreButton.addEventListener('click', () => this.onScoreButtonClick());
  }
    
  startNewGame() {
    this.currentRound = 1;
    this.totalScore = 0;
    this.yatzyEngine.resetScoreCard();
    // Set the current round on the UI
    document.getElementById('current-round').textContent = this.currentRound;
  }

  startNewRound() {
    this.yatzyEngine.rollsLeft = 3;
    this.yatzyEngine.selectedDice = [];
    this.currentRound += 1;
    document.getElementById('current-round').textContent = this.currentRound;
  }

  endGame() {
    // Display the final score for the single player
    console.log(`Game over! Your final score: ${this.totalScore}`);
    // You can also add any additional game-over logic or UI updates here.
  }

  endTurn() {
      this.maxTurnsPerRound--;

      // After the third roll, remove the click event listeners from dice elements to prevent further selection
      if (this.maxTurnsPerRound === 0) {
        diceElements.forEach((die) => {
          die.removeEventListener('click', () => this.onDieClick(index));
        });

        // Start a new round immediately after three turns
        this.startNewRound();
      }

      // Check if this was the last turn of the last round
      if (this.maxTurnsPerRound <= 0 && this.currentRound >= this.maxRounds) {
        this.endGame();
      }
    }




  onDieClick(index) {
    diceElements[index].classList.toggle('selected');
    //const dice = diceObjects[index].diceValue;

    if (diceElements[index].classList.contains('selected')) {
      this.yatzyEngine.selectDie(diceObjects[index]);
    } else {
      this.yatzyEngine.selectDie(diceObjects[index]);
    }
  }

 onRollButtonClick() {
    this.yatzyEngine.rollDice();
    this.updateDiceDisplay();
  }

  updateDiceDisplay() {
  //const diceValues = this.yatzyEngine.die.map(die => die.diceValues[0]); // Update this line
  diceElements.forEach((die, index) => {
    // Check if the die is currently selected
    const isSelected = die.classList.contains('selected');

    // If the die is selected, don't change its background position during the animation
    if (!isSelected) {
      // Add a class to trigger the rolling animation
      die.classList.add('rolling');
      setTimeout(() => {
        // After the rolling animation, update the background position
        die.style.backgroundPosition = `${((diceValues[index] - 1) * -100)}px 0`;
        // Remove the rolling class to stop the animation
        die.classList.remove('rolling');
      }, 1000); // Adjust the delay as needed
    }
  });
}


  onScoreButtonClick() {
  if (this.currentRound > this.maxRounds) {
    this.endGame();
  } else {
    if (this.yatzyEngine.rollsLeft <= 0) {
      const selectedCategory = document.getElementById('category-selector').value;

      // Find the index of the selected die
      let selectedIndex = -1;
      diceElements.forEach((die, index) => {
        if (die.classList.contains('selected')) {
          selectedIndex = index;
        }
      });

      if (selectedIndex !== -1) {
        console.log('Calling calculateScore for category:', selectedCategory);

        this.calculateAndSetScore(selectedCategory, selectedIndex);
        this.updateScoreCardDisplay(); // Make sure this line is present
        this.startNewRound();
      } else {
        console.log('Please select a die before scoring.');
      }
    } else {
      console.log(`Round ${this.currentRound} completed. Rounds left: ${this.maxRounds - this.currentRound}`);
    }
  }
}


      
  updateScoreCardDisplay() {
  for (const category in this.yatzyEngine.scoreTable) {
    const element = document.getElementById(category);
    if (element) {
      // Check if the element is an input field
      if (element.tagName === 'INPUT') {
        element.value = this.yatzyEngine.scoreTable[category] !== null
          ? this.yatzyEngine.scoreTable[category]
          : '';
      } else {
        // If it's not an input field, set the text content
        element.textContent = this.yatzyEngine.scoreTable[category] !== null
          ? this.yatzyEngine.scoreTable[category]
          : '';
      }
    }
  }
}



}
document.addEventListener('DOMContentLoaded', function () {
  const yatzyGame = new YatzyGame();
});
