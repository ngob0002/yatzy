import Dice from "./Dice.js";
import YatzyEngine from "./YatzyEngine.js";
import YatzyGame from "./YatzyGame.js";

document.addEventListener('DOMContentLoaded', function () {
    // DOM element variables
    const diceElements = [die1, die2, die3, die4, die5];
    const totalDiv = document.getElementById('total');
    
    // Define selectedDice and other variables
    const rollButton = document.getElementById('roll-button');

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

    // Add an event listener to the roll button to call onRollButtonClick
    rollButton.addEventListener('click', onRollButtonClick);

    function onRollButtonClick() {
        diceElements.forEach(dice => startAnimation(dice));
        setTimeout(() => {
            diceValues = diceElements.map(dice => stopAnimation(dice));
            // Filter out null values from diceValues
            diceValues = diceValues.filter(value => value !== null);

            combinedArray = selectedDice.concat(diceValues);

            // Calculate scores here
            const OneScore = calculateOnes(combinedArray);
            const TwoScore = calculateTwos(combinedArray);
            // Calculate other scores
            const ThreeScore = calculateThrees(combinedArray);
            const FourScore = calculateFours(combinedArray);
            const FiveScore = calculateFives(combinedArray);
            const SixScore = calculateSixes(combinedArray);
            const ChanceScore = calculateChance(combinedArray);
            const TOAKscore = calculateThreeOfAKind(combinedArray);
            const FOAKscore = calculateFourOfAKind(combinedArray);
            const fullHouseScoreValue = calculateFullHouse(combinedArray);
            const smallStraight = calculateSmallStraight(combinedArray);
            const largeStraight = calculateLargeStraight(combinedArray);
    

            // Update score display
            Ones.textContent = OneScore;
            Twos.textContent = TwoScore;
            // Update other score elements
            Threes.textContent = ThreeScore;
            Fours.textContent = FourScore;
            Fives.textContent = FiveScore;
            Sixes.textContent = SixScore;
            ThreeOfAKind.textContent = TOAKscore;
            FourOfAKind.textContent = FOAKscore;
            FullHouse.textContent = fullHouseScoreValue;
            SmallStraight.textContent = smallStraight;
            LargeStraight.textContent = largeStraight;
            Yahtzyscore.textContent = yahtzyScore;
            totalDiv.textContent = ChanceScore;
        }, 1000);
    }

    function startAnimation(dice) {
        if(!dice.classList.contains('selected')) {
        dice.style.animation = 'roll 1s steps(6) infinite';
        }
    }
    function stopAnimation(dice) {
        if (dice.classList.contains('selected')) {
            return null;
        }
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        dice.style.animation = 'none';
        dice.style.backgroundPosition = -100 * (randomNumber - 1) + '% 0';
        return randomNumber;
    }
    // Define other functions for score calculation

    
});