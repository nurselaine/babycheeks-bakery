import {
  FETCH_MENUITEMS_REQUEST,
  FETCH_MENUITEMS_SUCCESS,
  FETCH_MENUITEMS_FAILURE,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  LOAD_CART,
  PROCESS_ORDER,
  COMPLETE_ORDER,
  ADD_CUSTOMER_INFO,
  UPDATE_ORDER_ID,
  EMPTY_CART,
} from "../actionTypes/actionTypes";

// created two action creators aka pure js functions that returns
// action object with specific type

// each action obj must have specific UNIQUE type value
// along with any additional data needed to update state

const fetchMenuItemsRequest = (item_id) => {
  return {
    type: FETCH_MENUITEMS_REQUEST,
    item_id,
  };
};

const fetchMenuItemsSuccess = (item_id) => {
  return {
    type: FETCH_MENUITEMS_SUCCESS,
    item_id,
  };
};

const fetchMenuItemsFailure = (item_id) => {
  return {
    type: FETCH_MENUITEMS_FAILURE,
    item_id,
  };
};

const addItem = (item_id) => {
  return {
    type: ADD_ITEM,
    item_id,
  };
};

const deleteItem = (item_id) => {
  return {
    type: DELETE_ITEM,
    item_id,
  };
};

const updateItem = (count, item_id) => {
  return {
    type: UPDATE_ITEM,
    value: count,
    item_id,
  };
};

const loadCart = () => {
  return {
    type: LOAD_CART,
  };
};

const processOrder = () => {
  return {
    type: PROCESS_ORDER,
  };
};

const completeOrder = () => {
  return {
    type: COMPLETE_ORDER,
  };
};

const addCustomerInfo = (firstname, lastname) => {
  return {
    type: ADD_CUSTOMER_INFO,
    firstname,
    lastname,
  };
};

const updateOrderID = (order_id) => {
  return {
    type: UPDATE_ORDER_ID,
    order_id,
  };
};

const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export {
  fetchMenuItemsRequest,
  fetchMenuItemsSuccess,
  fetchMenuItemsFailure,
  addItem,
  deleteItem,
  updateItem,
  loadCart,
  processOrder,
  completeOrder,
  addCustomerInfo,
  updateOrderID,
  emptyCart,
};
