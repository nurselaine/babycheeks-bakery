import React from "react";

// reposition cards
// use sine for y coor
// use cosine for x coor
const get_coor = (radian_interval, radius) => {
  return {
    x: Math.cos(radian_interval) * radius,
    y: Math.sin(radian_interval) * radius,
  }
}

const Card = ({index, radius, center, rotateAngle}) => {
  let radian_interval= (Math.PI / 3) * index;
  let coor = get_coor(radian_interval, radius);

  return (
    <div 
      style={{
        ...styles.card, 
        left: `${center.x + coor.x}px`, 
        top: `${center.y + coor.y}px`
      }}
    >{index}</div>
  )
}

const styles = {
  card: {
    margin: '0',
    padding: '0',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: '50px',
    width: '50px',
    backgroundColor: 'blue',
    borderRadius: '25px'
  }
}

export default Card;