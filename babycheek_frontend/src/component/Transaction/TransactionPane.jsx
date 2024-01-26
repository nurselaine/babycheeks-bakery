import React, { useEffect, useState } from "react";
import "./Transaction.css";
import data from "../../utils/home_data.json";

const TransactionPane = ({item_img, title, desc, cost}) => {
  const [parseCost, setparseCost] = useState('');
  const [largeScreen, setLargeScreen] = useState(false);

  useEffect(() => {
    setparseCost(cost.toFixed(2));
    
  }, []);

  useEffect(() => {

    const handleResize = () => {
      if(window.innerWidth > 800){
        setLargeScreen(true);
      } else {
        setLargeScreen(false);
      }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [largeScreen, window.innerHeight]);

  return (
    <div className="transactionPane">
      <img 
        src={item_img}
        alt={title}
        className="pane-img"
      />
      <div className="pane-content">
        <p>{title}</p>
        {
          largeScreen ? <p>{desc}</p> : <p>${parseCost}</p>
        }
      { largeScreen && <p className="pane-price">${parseCost}</p>}
      </div>
      <div className="counter">
        <button>+</button>
        <input type='text' value={0} />
        <button>-</button>
      </div>
    </div>
  );
};

export default TransactionPane;