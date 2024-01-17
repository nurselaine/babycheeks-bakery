import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";

const Wheel = ({ props }) => {
  const wheelRef = useRef(null);
  let [radius] = useState(150);
  let [cards, setCards] = useState([]); // all images
  let [rotateAngle, setRotateAngle] = useState(0);
  let [currentImage, setCurrentImage] = useState(3);
  let [scroll] = useState(0);

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
  }, []);

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
  }, []);

  const rotateWheel = (direction) => {
    const newImage = direction === 'right' ? currentImage + 1 : currentImage - 1;
    const newRotateAngle = newImage * (360 / 6);
    setCurrentImage(currentImage);
    setRotateAngle(newRotateAngle);
  }

  return (
    <div
      ref={wheelRef}
      style={{ 
        ...styles.wheel, 
        transform: `rotate(${rotateAngle}deg)` 
      }}
      onWheel={(e) => e.deltaY > 0 ? rotateWheel('right') : rotateWheel('left')}
      id="wheel"
    >
      {cards}
    </div>
  );
};

const styles = {
  wheel: {
    margin: "0",
    padding: "0",
    position: "fixed",
    top: "30%",
    left: "90%",
    transform: "translate(-50%, -50%)",
    height: "300px",
    width: "300px",
    border: "red solid 1px",
    borderRadius: "50%",
  },
};

const breakpoints = {
  base: "0em", // 0px
  sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
  md: "48em", // ~768px
  lg: "62em", // ~992px
  xl: "80em", // ~1280px
  "2xl": "96em", // ~1536px
};

export default Wheel;
