import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";

const Wheel = () => {
  const wheelRef = useRef(null);
  let [radius] = useState(150);
  let [cards, setCards] = useState([]); // all images
  let [rotateAngle, setRotateAngle] = useState(0);
  let [currentImage, setCurrentImage] = useState(3);
  let [center_of_wheel, set_center_of_wheel] = useState({});

  let cookies = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    let center_of_wheel = {
      x: parseFloat(wheelRef.current.offsetWidth) / 2,
      y: parseFloat(wheelRef.current.offsetHeight) / 2,
    };

    cookies.forEach(c => {
      c = {
        ...c,
        center: center_of_wheel
      }
    });
    set_center_of_wheel(center_of_wheel);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const cardIndex = Math.floor(scrollPos / (window.innerHeight / 6));

      let activeCard = (cardIndex+ 3) % 6;
      setCurrentImage(activeCard);

      const newRotateAngle = cardIndex * (360 / 6);
      setRotateAngle(newRotateAngle);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const rotateWheel = (direction) => {
  //   const newImage = direction === 'right' ? currentImage + 1 : currentImage - 1;
  //   console.log(newImage);
  //   const newRotateAngle = newImage * (360 / 6);
  //   setCurrentImage(newImage);
  //   setRotateAngle(newRotateAngle);
  // }

  console.log(rotateAngle);
  return (
    <div
      id="wheel"
      ref={wheelRef}
      style={{ 
        ...styles.wheel, 
        transform: `rotate(${rotateAngle}deg)` 
      }}
    >
      {
        cookies.map((c,id) => (
          <Card
          radius={radius}
          center={center_of_wheel}
          key={`card_${c}`}
          index={c}
          rotateAngle={rotateAngle}
          isActive={id===currentImage}
        />
        ))
      }
    </div>
  );
};

const styles = {
  wheel: {
    margin: "0",
    padding: "0",
    position: "fixed",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "400px",
    width: "400px",
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
