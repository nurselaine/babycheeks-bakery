import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// useSelector helps read store and its contents
// useDispatch dispatches actions/action creators that return actions
import "./Transaction.css";
import {
  addItem,
  deleteItem,
  updateItem,
} from "../../Redux/actions/cartActions";

const TransactionPane = ({ item_id }) => {
  const dispatch = useDispatch();

  const [largeScreen, setLargeScreen] = useState(false);
  
  const itemData = useSelector(state => state.menuItems.find(item => item.item_id === item_id));
  const itemCounter = useSelector(state => state.item_counter.find(index => index.item_id === item_id));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setLargeScreen(true);
      } else {
        setLargeScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [largeScreen, window.innerHeight]);

  const userInputHandler = (e) => {
    let value = e.target.value;
    if (value > 24) {
      alert("Please call for orders greater than 24 cookies");
      return;
    }
    dispatch(updateItem(value, itemData.item_id));
  };

  return (
    <div className="transactionPane">
      <div>
        <img src={itemData.item_assets.cookie} alt={itemData.item_name} className="pane-img" />
      </div>
      <div className="content-ctn">
        <div className="pane-content">
          <p>{itemData.item_name}</p>
          {largeScreen ? <p className="">{itemData.item_description}</p> : <p>${itemData.pricing.single.toFixed(2)}</p>}
          <div className="pane-counter">
            <button onClick={() => dispatch(addItem(itemData.item_id))}>+</button>
            <input value={itemCounter.counter} onChange={(e) => userInputHandler(e)} />
            <button
              disabled={itemCounter.counter > 0 ? false : true}
              onClick={() => dispatch(deleteItem(itemData.item_id))}
            >
              -
            </button>
          </div>
          {largeScreen && <p className="pane-price">${itemData.pricing.single.toFixed(2)}</p>}
        </div>
      </div>
    </div>
  );
};

export default memo(TransactionPane);
