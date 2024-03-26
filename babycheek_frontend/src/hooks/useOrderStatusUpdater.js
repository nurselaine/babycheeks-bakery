import { useDispatch } from "react-redux";
import { updateOrderStatusRequest } from "../Redux/actions/dashboardActions";
import { useCallback } from "react";


export function useOrderStatusUpdater(orderID) {

  const dispatch = useDispatch();

  const updateOrderStatus = useCallback(
    (orderID) => {
      dispatch(updateOrderStatusRequest(orderID));
    },
    [dispatch]
  )
  return updateOrderStatus;
}

  // const updateResponse = await fetch(`http://localhost:3001/db/updateOrderStatus/${orderID}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // .then((response) => response.json())
  // .then((data) => {return data.message})
  // .catch((error) => console.error(error));

  // console.log(updateResponse);
  // return Promise.resolve(updateResponse)