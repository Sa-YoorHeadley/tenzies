import React from 'react'

export default function Die({ dieValue, isHeld, holdDice }) {
  return (
    <div className={isHeld ? 'die held' : 'die'} onClick={holdDice}>{dieValue}</div>
  )
}
