import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../actionTypes/actionTypes";

const initialState = {
  numOfItems: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems + 1
      };
      case DELETE_ITEM:
        return {
          ...state,
          numOfItems: state.numOfItems - 1
      };
      case UPDATE_ITEM:
        return {
          ...state,
          numOfItems: action.value
      };
      default:
        return state;
  }
};

export default cartReducer;