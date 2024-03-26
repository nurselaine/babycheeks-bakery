import { FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS,FETCH_ORDERS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE } from "../actionTypes/actionTypes";

const fetchOrderRequest = () => {
  return {
    type: FETCH_ORDERS_REQUEST,
  };
};

const fetchOrderSuccess = (payload) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: payload,
  };
};

const fetchOrderFailure = (error) => {
  return {
    type: FETCH_ORDERS_FAILURE,
    error,
  };
};

export const fetchOrderData = () => {
  return async (dispatch, getState) => {
    dispatch(fetchOrderRequest());
    try {
      const response = await fetch('http://localhost:3001/db/getAllOrders')
      .then((response) => response.json())
      .then((data) => {return data.orders})
      .catch((error) => console.error(error));

      console.log("orders ", response);
      dispatch(fetchOrderSuccess(response));
    } catch (error) {
      dispatch(fetchOrderFailure(error.message));
    }
  }
}

const updateOrderStatusReqest = (orderID) => {
  return {
    type: UPDATE_ORDER_STATUS_REQUEST,
    orderID,
  }
}

const updateOrderStatusSuccess = (payload, order_id) => {
  return {
    type: UPDATE_ORDER_STATUS_SUCCESS,
    payload,
    order_id,
  }
}

const updateOrderStatusFailure = (error) => {
  return {
    type: UPDATE_ORDER_STATUS_FAILURE,
    error,
  }
}

export const updateOrderStatusRequest = async (orderID) => {
  try {
    const updateResponse = await fetch(`${process.env.API_BASE_ADDRESS}/db/updateOrderStatus/${orderID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {return data.message})
    .catch((error) => console.error(error));

    dispatch(updateOrderStatusSuccess(updateResponse, orderID));
  
    return updateResponse;
  } catch (error) {
    dispatch(fetchOrderFailure(error.message));
  }
}
export default {
  fetchOrderData,
  fetchOrderRequest,
  fetchOrderFailure,
  updateOrderStatusReqest,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
}