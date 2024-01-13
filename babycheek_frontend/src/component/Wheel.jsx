import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";

const Wheel = ({props}) => {
  const wheelRef = useRef(null);
  let [radius, setRadius] = useState(150);
  let [cards, setCards] = useState([]); // all images 
  let [theta, setTheta] = useState(0.0); 
  // theta & temp_theta controls the degree the wheel is rotated 

  let temp_theta = 0.0;

  useEffect(() => {
    let center_of_wheel = {
      x: parseFloat(wheelRef.current.offsetWidth) / 2,
      y: parseFloat(wheelRef.current.offsetHeight) / 2,
    }

    let temp_cards = [];

    for(let i = 0; i < 6; i++) {
      temp_cards.push(
        <Card radius={radius} radian_interval={(Math.PI / 4) * i} center={center_of_wheel} key={`card_${i}`} />
      )
    }

    setCards(temp_cards);
  }, []);

  return (
    <div ref={wheelRef} style={styles.wheel} id='wheel'>
      {cards}
    </div>
  )
}

const styles = {
  wheel: {
    margin: '0',
    padding: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100px',
    width: '100px',
    backgroundColor: 'red',
    borderRadius: '50px'
  }
}

export default Wheel;