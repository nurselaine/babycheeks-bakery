import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// useSelector helps read store and its contents
// useDispatch dispatches actions/action creators that return actions
import "./Transaction.css";
import { addItem, deleteItem } from "../../Redux/actions/cartActions";

const TransactionPane = ({item_img, title, desc, cost}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

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
        <button
          onClick={() => dispatch(addItem())}
        >+</button>
        <input type='text' value={state.numOfItems} />
        <button 
          disabled={state.numOfItems > 0 ? false : true}
          onClick={() => dispatch(deleteItem())}>-</button>
      </div>
    </div>
  );
};

export default memo(TransactionPane);