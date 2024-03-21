import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../actionTypes/actionTypes";

// created two action creators aka pure js functions that returns
// action object with specific type

// each action obj must have specific UNIQUE type value
// along with any additional data needed to update state

const addItem = () => {
  return {
    type: ADD_ITEM,
  }
};

const deleteItem = () => {
  return {
    type: DELETE_ITEM,
  }
};

const updateItem = (count) => {
  return {
    type: UPDATE_ITEM,
    value: count,
  }
}

export { addItem, deleteItem, updateItem };
