import { useEffect, useState } from 'react'
import './App.css';
import SingleCard from './components/singleCard/singleCard';

const cardImages = [
  {"src":"/img/helmet-1.png", match: false},
  {"src":"/img/potion-1.png", match: false},
  {"src":"/img/ring-1.png", match: false},
  {"src":"/img/scroll-1.png", match: false},
  {"src":"/img/shield-1.png", match: false},
  {"src":"/img/sword-1.png", match: false}
]

function App() {
  const [cards, setCards]= useState([])
  const [turns, setTurns]= useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  //shuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=> ({...card, id:Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    console.log(card)
  }

  //verify matching Cards
  useEffect((card)=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        //evaluation with state
        setCards(prevCards=>{
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, match: true}
            }else{
              return card
            }
          })
        })
      resetTurn()
      } else{
        setTimeout(() => resetTurn(), 1000)
      }  

    }
  },[choiceOne, choiceTwo])  

  
  //start the game automatically
  useEffect(()=>{
    shuffleCards()
  },[])

  //reset choices & increase turn
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1 )
    setDisabled(false)
  }
  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="cards-grid">
        {cards.map(card=>(
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.match}
            disabled={disabled}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App