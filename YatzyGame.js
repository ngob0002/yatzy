class YatzyGame {
    constructor() {
        this.currentPlayer = 1;
        this.currentRound = 1;
        this.totalScore = {};
        this.players = 1; // Number of players
    }

    startNewGame(players) {
        this.players = players;
        this.currentPlayer = 1;
        this.currentRound = 1;
        this.totalScore = {};
    }

    endTurn() {
        // Implement logic to end the current player's turn and switch to the next player
        if (this.currentPlayer < this.players) {
            this.currentPlayer++;
        } else {
            this.currentPlayer = 1;
            this.currentRound++;
        }
    }

    endGame() {
        // Implement logic to determine the winner and finalize the game
        // You can calculate the winner based on the total score
        let winner = 1; // Default winner is player 1
        let highestScore = this.totalScore[1] || 0;

        for (let player = 2; player <= this.players; player++) {
            const playerScore = this.totalScore[player] || 0;
            if (playerScore > highestScore) {
                winner = player;
                highestScore = playerScore;
            }
        }

        return winner;
    }
}

// Example usage:
const yatzyGame = new YatzyGame();
yatzyGame.startNewGame(4); // Start a new game with 4 players

// Simulate turns and scores
yatzyGame.totalScore[1] = 100;
yatzyGame.totalScore[2] = 110;
yatzyGame.endTurn(); // End player 1's turn and switch to player 2

yatzyGame.totalScore[2] = 200;
yatzyGame.endTurn(); // End player 2's turn and switch to player 3

// ... Continue the game

const winner = yatzyGame.endGame();
console.log(`Player ${winner} wins!`);
// Export the YatzyGame class/module
export default YatzyGame;
