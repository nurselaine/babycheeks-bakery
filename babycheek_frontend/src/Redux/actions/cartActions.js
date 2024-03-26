import {
  FETCH_MENUITEMS_REQUEST,
  FETCH_MENUITEMS_SUCCESS,
  FETCH_MENUITEMS_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
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

const fetchMenuItemsRequest = () => {
  return {
    type: FETCH_MENUITEMS_REQUEST,
  };
};

const fetchMenuItemsSuccess = (payload) => {
  return {
    type: FETCH_MENUITEMS_SUCCESS,
    payload: payload,
  };
};

const fetchMenuItemsFailure = (error) => {
  return {
    type: FETCH_MENUITEMS_FAILURE,
    error,
  };
};

export const fetchData = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMenuItemsRequest());
    try {
      const response = await fetch('http://localhost:3001/menu/menuItems')
      .then((response) => response.json())
      .then((data) => {return data.menuItems})
      .catch((error) => console.error(error));

      console.log("menu items ", response);
      dispatch(fetchMenuItemsSuccess(response));
    } catch (error) {
      dispatch(fetchMenuItemsFailure(error.message));
    }
  }
}

// const fetchOrderRequest = () => {
//   return {
//     type: FETCH_ORDERS_REQUEST,
//   };
// };

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
  // fetchOrderRequest,
  // fetchOrderSuccess,
  // fetchOrderFailure,
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
