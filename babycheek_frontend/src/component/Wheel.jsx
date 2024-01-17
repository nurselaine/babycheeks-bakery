import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";

const Wheel = ({props}) => {
  const wheelRef = useRef(null);
  let [radius, setRadius] = useState(150);
  let [cards, setCards] = useState([]); // all images 
  let [theta, setTheta] = useState(0.0); 
  let [rotateAngle, setRotateAngle] = useState(0);
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
        <Card 
          radius={radius} 
          radian_interval={(Math.PI / 3) * i} 
          center={center_of_wheel} key={`card_${i}`} 
        />
      )
    }

    setCards(temp_cards);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const newRotateAngle = scrollPos / 6;
      setRotateAngle(newRotateAngle);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScroll = (e) => {
    styles.wheel.transform = `rotate(${window.scrollY / 2}deg)`
    // clearTimeout(anim_id);
    // styles.wheel.transform = `translate(-50%, -50%) rotate(${temp_theta + (e.deltaY * 0.5)}deg)`;
    // temp_theta += (e.deltaY * 0.5);

    // let anim_id = setTimeout(() => {
    //   setTheta({theta: temp_theta});
    // }, 150);
  }

  return (
    <div ref={wheelRef} style={{...styles.wheel, transform: `rotate(${rotateAngle}deg)`}} id='wheel'>
      {cards}
    </div>
  )
}

const styles = {
  wheel: {
    margin: '0',
    padding: '0',
    position: 'fixed',
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