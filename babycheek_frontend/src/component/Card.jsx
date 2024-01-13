import React from "react";

const Card = ({props}) => {
  return (
    <div style={styles.card}>

    </div>
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