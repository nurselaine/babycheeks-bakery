import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import "./Wheel.css";

const Wheel = ({ props }) => {
  const wheelRef = useRef(null);
  let [radius] = useState(150);
  let [cards, setCards] = useState([]); // all images
  let [rotateAngle, setRotateAngle] = useState(0);
  let [currentImage, setCurrentImage] = useState(3);
  let [scroll, setScroll] = useState(0);

  useEffect(() => {
    let center_of_wheel = {
      x: parseFloat(wheelRef.current.offsetWidth) / 2,
      y: parseFloat(wheelRef.current.offsetHeight) / 2,
    };

    let temp_cards = [];

    for (let i = 0; i < 6; i++) {
      temp_cards.push(
        <Card
          radius={radius}
          center={center_of_wheel}
          key={`card_${i}`}
          index={i}
          rotateAngle={rotateAngle}
        />
      );
    }

    setCards(temp_cards);
  }, [rotateAngle, radius]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const cardIndex = Math.floor(scrollPos / (window.innerHeight / 6));
      const newRotateAngle = cardIndex * (360 / 6);
      setRotateAngle(newRotateAngle);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  const rotateWheel = () => {
    setCurrentImage(currentImage + 1);
    setRotateAngle(60 * currentImage);
  }

  return (
    <div
      ref={wheelRef}
      style={{ 
        ...styles.wheel, 
        transform: `rotate(${rotateAngle}deg)` 
      }}
      onWheel={() => rotateWheel()}
      id="wheel"
    >
      <button onClick={() => rotateWheel()}>rotate</button>
      {cards}
    </div>
  );
};

const styles = {
  wheel: {
    margin: "0",
    padding: "0",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "100px",
    width: "100px",
    border: "red solid 1px",
    borderRadius: "50px",
  },
};

export default Wheel;
