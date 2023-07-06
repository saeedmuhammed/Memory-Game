import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card/Card';

const cardImages = [
  {src:'/img/helmet-1.png', matched : false},
  {src:'/img/potion-1.png', matched : false},
  {src:'/img/ring-1.png', matched : false},
  {src:'/img/scroll-1.png', matched : false},
  {src:'/img/shield-1.png', matched : false},
  {src:'/img/sword-1.png', matched : false},
];

function App() {

  const [cards , setCards] = useState([]);
  const [turn , setTurn] = useState(0);

  const [choiseOne , setChoiseOne] = useState(null);
  const [choiseTwo , setChoiseTwo] = useState(null);
  
  const [disabled , setDisabled] = useState(false);
  const startNewGame = () => {

    //shuffle cards and make 2 of every card
    const shuffledCards = [...cardImages , ...cardImages]
    .sort(()=>Math.random() - 0.5)
    .map((card)=> ({...card,id:Math.random()}));
    
    setChoiseOne(null);
    setChoiseTwo(null);
    setCards(shuffledCards);
    setTurn(0);
  }

  //check if there is a choise one add the choise to choise two
  const handelChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
    
  }

  const resetTurn = useCallback(()=>{
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurn(turn +1);
    setDisabled(false);
    
  },[turn])

  //Compare choises and we add it in useEffect cuse if we use it in the handelChoise the comparison will fire before the state is updated
  useEffect(()=> {
    if (choiseOne && choiseTwo){
      setDisabled(true);
      if(choiseOne.src === choiseTwo.src){
        setCards(prev => { return prev.map((card)=>{
          if(card.src === choiseOne.src){
            return {...card , matched:true};
          }
          else {
            return card;
          }
        }) })
        
        resetTurn();
      }
      else {
        setTimeout(()=> resetTurn() , 1000)
        
      }
    }


  },[choiseOne , choiseTwo , resetTurn ])


 
  
  //start tha game automatically when the user open the game for the first time
  useEffect(()=>{
    startNewGame()
  },[])
  
  return (
    <div className="App">
     <h1>Memory Game </h1>
     <button onClick={startNewGame}>New Game</button>
     <div className='card-grid'>
      {cards.map((card)=>(
       <Card key={card.id} 
       card={card} 
       handelChoise={handelChoise} 
       flipped={card === choiseOne || card === choiseTwo || card.matched}
       disabled = {disabled} 
       />
      ))}
     </div>
     <p>Turns : {turn} </p>
    </div>
  );
}

export default App;
