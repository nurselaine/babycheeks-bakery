import React from "react";
import "./Transaction.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  deleteItem,
  updateItem,
} from "../../Redux/actions/cartActions";

const TransactionCounter = ({item_id}) => {

  const dispatch = useDispatch();
  const itemData = useSelector(state => state.menuItems.find(item => item.item_id === item_id));
  const itemCounter = useSelector(state => state.item_counter.find(index => index.item_id === item_id));

  const userInputHandler = (e) => {
    let value = e.target.value;
    if (value > 24) {
      alert("Please call for orders greater than 24 cookies");
      return;
    }
    dispatch(updateItem(value, itemData.item_id));
  };
  return (
    <div className="pane-counter">
      <button onClick={() => dispatch(addItem(itemData.item_id))}>+</button>
      <input
        value={itemCounter.counter}
        onChange={(e) => userInputHandler(e)}
      />
      <button
        disabled={itemCounter.counter > 0 ? false : true}
        onClick={() => dispatch(deleteItem(itemData.item_id))}
      >
        -
      </button>
    </div>
  );
};

export default TransactionCounter;