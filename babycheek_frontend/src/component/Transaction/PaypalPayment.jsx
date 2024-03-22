import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import "./Transaction_styles.css";
import { useSelector, useDispatch } from "react-redux";
import { processOrder, updateOrderID } from "../../Redux/actions/cartActions";

const PayPalPayment = () => {
  let [orderApproved, setOrderApproved] = useState(false);
  const shopping_cart = useSelector(state => state.shopping_cart);
  const orderID = useSelector(state => state.orderID);
  const dispatch = useDispatch();

  const createOrder = async () => {
    // This function sets up the details of the transaction, including the amount and line item details.
    try {
      const response = await fetch("http://localhost:3001/pay/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopping_cart),
      });

      console.log("ORDER SENT TO SERVER");
      // get response
      const orderData = await response.json();

      console.log("ORDER RESPONSE" + JSON.stringify(orderData));

      // check order id
      if (!orderData.id) {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
      return orderData.id;
    } catch (error) {
      console.error(error);
      console.log(`Could not initiate Paypal Checkout... ${error}`);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const orderID = data.orderID;
      const response = await fetch(
        `http://localhost:3001/pay/api/orders/${orderID}/capture`,
        {
          method: "POST",
          body: JSON.stringify({
            orderID: orderID,
          }),
        }
      );

      const orderData = await response.json();

      console.log("CONFIRMATION ORDER ", JSON.stringify(orderData));

      const errorDetail = orderData?.details?.[0];

      dispatch(processOrder());

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
        
        dispatch(updateOrderID(orderData?.id));
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
    } catch (error) {
      console.error(error);
      console.log(
        `Sorry, your transaction could not be processed...<br><br>${error}`
      );
    }
  };
  return (
    <div className="paypal-ctn">
        <PayPalButtons
          createOrder={() => createOrder()}
          onApprove={(data, actions) => onApprove(data, actions)}
    
        />
    </div>
  );
};

export default PayPalPayment;
