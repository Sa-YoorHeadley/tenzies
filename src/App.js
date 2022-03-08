import React, { useState } from "react";
import { nanoid } from 'nanoid'
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice)

  function allNewDice(){
    let randomDiceArray = []
    for(let i = 0; i < 10; i++){
      randomDiceArray.push({
        'id': nanoid(),
        'value': Math.ceil(Math.random() * 6),
        'isHeld': false
      })
    }
    return randomDiceArray
  }

  function holdDice(id){
    setDice(oldDice => {
      return oldDice.map(die =>{
        if(die.id === id){
          die.isHeld = !die.isHeld
        } 
        return die
      })
    })
  }

  const dieElements = dice.map(die => <Die key={die.id} dieId={die.id} dieValue={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

  return (
    <div className="App">
      <main className="main">
        <section className="dies">
          {dieElements}
        </section>
        <button className="btn" onClick={() => setDice(allNewDice)}>Roll</button>
      </main>
    </div>
  );
}


export default App;
