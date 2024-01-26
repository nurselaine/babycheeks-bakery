import React from "react";
import './Card.css';

// reposition cards
// use sine for y coor
// use cosine for x coor
const get_coor = (radian_interval, radius) => {
  return {
    x: Math.cos(radian_interval) * (radius * 2),
    y: Math.sin(radian_interval) * (radius * 2),
  }
}

const Card = ({index, radius, center, isActive}) => {
  const active = (index) % 6;
  console.log("active & index", active, index);
  let radian_interval= (Math.PI / 3) * index;
  let coor = get_coor(radian_interval, radius);
  return (
    <div 
      style={{
        left: `${center.x + coor.x}px`, 
        top: `${center.y + coor.y}px`
      }}
      className={active !== index ? 'carousel-item-active' : 'carousel-item'}
      id={`cardImage-${index}`}
    >{index}</div>
  )
}

export default Card;