import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// useSelector helps read store and its contents
// useDispatch dispatches actions/action creators that return actions
import "./Transaction.css";
import { addItem, deleteItem, updateItem } from "../../Redux/actions/cartActions";

const TransactionPane = ({ item_img, title, desc, cost }) => {
  let numOfItems = useSelector((state) => state.numOfItems);
  const dispatch = useDispatch();

  const [parseCost, setparseCost] = useState("");
  const [largeScreen, setLargeScreen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setparseCost(cost.toFixed(2));
  }, []);

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

  const countHandlerIncrement = () => {
    setCount(count + 1);
  };

  const userInputHandler = (e) => {
    let value = e.target.value;
    if (value > 24) {
      alert("Please call for orders greater than 24 cookies");
      return;
    }
    dispatch(updateItem(value))
    setCount(value);
  };

  return (
    <div className="transactionPane">
      <div>
        <img src={item_img} alt={title} className="pane-img" />
      </div>
      <div style={{ margin: "0 15px" }}>
        <div>
          <p>{title}</p>
          {largeScreen ? <p>{desc}</p> : <p>${parseCost}</p>}
          {largeScreen && <p className="pane-price">${parseCost}</p>}
        </div>
        <div>
          <button onClick={() => dispatch(addItem())}>+</button>
          <input value={numOfItems} onChange={(e) => userInputHandler(e)} />
          <button
            disabled={numOfItems > 0 ? false : true}
            onClick={() => dispatch(deleteItem())}
          >
            -
          </button>
          <p>item counter</p>
        </div>
      </div>
      {/* <img src={item_img} alt={title} className="pane-img" />
      <div className="pane-content">
        <p>{title}</p>
        {largeScreen ? <p>{desc}</p> : <p>${parseCost}</p>}
        {largeScreen && <p className="pane-price">${parseCost}</p>}
      </div>
      <div className="counter">
        <button onClick={() => dispatch(addItem())}>+</button>
        <input type="text" value={state.numOfItems} onChange={() => ""} />
        <button
          disabled={state.numOfItems > 0 ? false : true}
          onClick={() => dispatch(deleteItem())}
        >
          -
        </button>
      </div> */}
    </div>
  );
};

export default memo(TransactionPane);
