import React from 'react';
import Die from './Die';
import Confetti from 'react-confetti'
import {nanoid} from "nanoid"


/*
TODO features:
- CSS: put real dots on the dice.
- Save your previous 5 games (rolls and time) to localStorage and display it underneath
*/

function App() {
  const diceAmount = 10;
  const [dice, setDice] = React.useState(allNewDice());
  const [rolls, setRolls] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState(null);
  const [start, setStart] = React.useState(false);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld);
      const dieVal = dice[0].value;
      const allSameVal = dice.every(die => die.value === dieVal);
      if (allHeld && allSameVal){
        setTenzies(true);
        clearInterval(intervalId);
      }
      else {
        setTenzies(false);
      }
  }, [dice, timer, intervalId])

  function getRandomNum() {
    return Math.floor(Math.random() * (7 - 1) + 1);
  }

  function startGame() {
    setStart(true);
    const id = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    setIntervalId(id);
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
      setTimer(0);
      setStart(false);
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
    if (!tenzies && start)
      setDice(
        prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
      );
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} id={die.id} isHeld={die.isHeld} isEmpty={!start} holdFunc={holdDice} />);

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div>
        <b>Number of rolls: </b>{rolls}
        <br />
        <br />
        <b>Timer: </b>
        {timer}s
      </div>
      <div className="dice-container">
        {diceElements}
      </div>

      {start ? (
          <button className="roll-button" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        ) : (
          <button className="roll-button" onClick={startGame}>
            Start
          </button>
        )
      }
    </main>
  );
}

export default App;
