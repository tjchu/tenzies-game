import React from 'react';
import Die from './Die';
import Confetti from 'react-confetti'
import {nanoid} from "nanoid"


/*
TODO features:
- CSS: put real dots on the dice.
- Track the number of rolls
- Track the time it took to win
- Save your best time to localStorage
*/

function App() {
  const diceAmount = 10;
  const [dice, setDice] = React.useState(allNewDice());
  const [rolls, setRolls] = React.useState(0);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld);
      const dieVal = dice[0].value;
      const allSameVal = dice.every(die => die.value === dieVal);
      if (allHeld && allSameVal){
        setTenzies(true);
      }
      else {
        setTenzies(false);
      }
  }, [dice])

  function getRandomNum() {
    return Math.floor(Math.random() * (7 - 1) + 1);
  }

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < diceAmount; i++) {
      newDice.push({
        value: getRandomNum(),
        isHeld: false,
        id: nanoid()
      });
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setRolls(0);
      setTenzies(false);
    }

    else {
      setRolls(prevRolls => prevRolls + 1);
      setDice(
        prevDice => prevDice.map(die => !die.isHeld ? {...die, value: getRandomNum()} : die)
      );
    }
  }

  function holdDice(id) {
    if (!tenzies)
      setDice(
        prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
      );
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} id={die.id} isHeld={die.isHeld} holdFunc={holdDice} />);

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">{tenzies ? `Congratulations! It took you ${rolls} rolls to win.` : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
