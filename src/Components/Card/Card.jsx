import React from 'react'
import './Card.css'

export default function Card({card , handelChoise , flipped , disabled}) {
  const handelClick = () => {
    if(!disabled){
      handelChoise(card);
    }
    
  }
  
  return (
    <div className='card'>
          <div className={flipped ? 'flipped' : ''} >
            <img src={card.src} alt='card front' className='front' />
            <img src='/img/cover.png'
             onClick={handelClick} 
             alt='card back'
             className='back' 
             />
          </div>
        </div>
  )
}
