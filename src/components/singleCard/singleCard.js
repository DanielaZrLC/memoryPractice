import React from 'react'
import './singleCard.css';


export default function SingleCard({ card, handleChoice, flipped, disabled} ) {
  const handleClick = ()=>{
    if(!disabled){
      handleChoice (card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img alt="frontCard" src={card.src} className="front"/>
        <img alt="backCard" src="/img/cover.png" className="back" onClick={handleClick}/>
      </div>   
    </div>
  )
}
