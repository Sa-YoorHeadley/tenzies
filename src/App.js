import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid'
import Confetti from "react-confetti";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [time, setTime] = useState(0)
  
  useEffect(() => {
    const allHeld = dice.every( die => die.isHeld )
    const allEqual = dice.every( die => die.value === dice[0].value )
    if(allHeld && allEqual){
      setTenzies(true)
    }
  }, [dice])
  
  useEffect(() => {
    if(rolls === 1){
      console.log('game start')
    }
    if(tenzies){
      console.log('game end')
    } 
  }, [rolls])
  
  function getNewDie(){
    return {
      'id': nanoid(),
      'value': Math.ceil(Math.random() * 6),
      'isHeld': false
    }
  }

  function allNewDice(){
    let randomDiceArray = []
    for(let i = 0; i < 10; i++){
      randomDiceArray.push(getNewDie())
    }
    return randomDiceArray
  }

  function holdDice(id){
    setDice(oldDice => {
      return oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
    })
  }

  function rollDice(){ 
    setDice(oldDice => oldDice.map(die=> die.isHeld ? die : getNewDie()))
    setRolls(oldRolls => oldRolls + 1)
  }
  

  const dieElements = dice.map(die => <Die key={die.id} dieId={die.id} dieValue={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

  return (
    <div className="App">
      {tenzies && <Confetti/>}
      <main className="main">
        <div className='roll-count'>Rolls: {rolls}</div>
        <div className='time-count'>Time: {time}</div>

        {/* Fix */}
        <div className='best-roll'>Best Rolls: {rolls}</div>
        <div className='best-time'>Best Time: {time}</div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <section className="dies">
          {dieElements}
        </section>
        {!tenzies ? <button className="btn" onClick={rollDice}>Roll</button> : <button className="btn" onClick={() =>{setDice(allNewDice); setRolls(true); setTenzies(false)}}>New Game</button>}
      </main>
    </div>
  );
}


export default App;
