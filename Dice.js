class Dice {
    constructor(numberOfDice, element) {
      this.numberOfDice = numberOfDice;
      this.diceValue = 1;//initialize all dice values to 1
      this.element = element;
    //this.diceValues = new Array(numberOfDice).fill(1); // Initialize all dice to 1
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getDiceValue (){
    return this.diceValue;
  }
  

  roll() {
    this.startAnimation();

    setTimeout(() => {
      this.diceValue = this.getRandomNumber(1, 6);
      console.log('Dice value after roll:', this.diceValue);
      this.element.style.backgroundPosition = ((this.diceValue - 1) * -100) + "px 0";
      this.stopAnimation();
    }, 1000);
  }
    
  startAnimation() {
  const diceElement = document.getElementById(`die${this.numberOfDice}`);
  if (diceElement) {
    diceElement.classList.add('rolling');
    console.log('Start rolling animation');
  }
}

  stopAnimation() {
  const diceElement = document.getElementById(`die${this.numberOfDice}`);
  if (diceElement) {
    diceElement.classList.remove('rolling');
    console.log('Stop rolling animation');
  }
}
}
