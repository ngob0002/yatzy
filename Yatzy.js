// Import YatzyEngine and YatzyGame classes
// Update the import paths as per your project structure
// import YatzyEngine from "./YatzyEngine.js";
// import YatzyGame from "./YatzyGame.js";

// Initialize the turn count
let turns = 0;

// Store selected dice values
let selectedDice = [];

// Create instances of YatzyEngine 
const yatzyEngine = new YatzyEngine();


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // DOM element variables
    const diceElements = [
        document.getElementById('die1'),
        document.getElementById('die2'),
        document.getElementById('die3'),
        document.getElementById('die4'),
        document.getElementById('die5')
    ];
    const totalDiv = document.getElementById('total');
    const rollButton = document.getElementById('roll-button');
    const currentRoundDiv = document.getElementById('current-round');
    const scorecardButtons = document.querySelectorAll('.scorecard button');

    // Add click event listeners to dice elements
    diceElements.forEach(dice => {
        dice.addEventListener('click', function () {
            dice.classList.toggle('selected');

            const diceValue = parseInt(dice.style.backgroundPositionX) / -100 + 1;
            if (dice.classList.contains('selected')) {
                selectedDice.push(diceValue);
            } else {
                const index = selectedDice.indexOf(diceValue);
                if (index !== -1) {
                    selectedDice.splice(index, 1);
                }
            }
        });
    });

    // Add event listeners to the scorecard buttons
    scorecardButtons.forEach(button => {
        button.addEventListener('click', () => {
            const combination = button.id;
            yatzyGame.selectCombinationFromScorecard(combination);
            
            // Update your UI to display the updated scores
            // Assuming you have input fields for each combination, you can update them like this:
            const inputField = document.getElementById(combination);
            inputField.value = yatzyGame. selectCombinationFromScorecard(combination);
        });
    });

    // Event listener for the Roll button
    rollButton.addEventListener('click', onRollButtonClick);

    // Function to handle the roll button click
    function onRollButtonClick() {
        if (turns >= 3) {
            // Disable the button
            rollButton.disabled = true;
            // Show a message
            alert('You have used up three turns.');
            return;
        }

        if (yatzyGame.currentRound > yatzyGame.totalRounds) {
            // Game is over, do not proceed
            return;
        }

        yatzyGame.rollDice();

        // Update the UI to reflect the new roll.
        updateDiceDisplay(diceElements, yatzyGame.rolledDiceValues);

        // Update the current round display
        currentRoundDiv.textContent = `Round: ${yatzyGame.currentRound}`;

        // Increment the turn count
        turns++;

        // Handle the logic for the roll button.
        if (yatzyGame.currentRoll >= 3) {
            rollButton.disabled = true;
        }
    }

    // Function to update the dice display
    function updateDiceDisplay(diceElements, rolledDiceValues) {
        // Loop through dice elements and set their display based on rolledDiceValues.
        for (let i = 0; i < diceElements.length; i++) {
            const dice = diceElements[i];
            const diceValue = rolledDiceValues[i];
            dice.style.backgroundPositionX = -100 * (diceValue - 1) + '%';
        }
    }
});
