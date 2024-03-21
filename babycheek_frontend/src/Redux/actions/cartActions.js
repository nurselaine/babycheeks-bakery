import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, LOAD_CART } from "../actionTypes/actionTypes";

// created two action creators aka pure js functions that returns
// action object with specific type

// each action obj must have specific UNIQUE type value
// along with any additional data needed to update state

const addItem = (item_id) => {
  return {
    type: ADD_ITEM,
    item_id
  }
};

const deleteItem = (item_id) => {
  return {
    type: DELETE_ITEM,
    item_id
  }
};

const updateItem = (count, item_id) => {
  return {
    type: UPDATE_ITEM,
    value: count,
    item_id
  }
}

const loadCart = () => {
  return {
    type: LOAD_CART,
  }
}

export { addItem, deleteItem, updateItem, loadCart };
