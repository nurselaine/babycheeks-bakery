import React from "react";
import "./Receipt.css";

const OrderConfirmation = ({ order_id }) => {
  return (
    <div className="confirmation-ctn">
      <p>Thank you for your order!</p>
      <p>Order ID: {order_id}</p>
      <p>Please save this number for pick up.</p>
      <img
        src="./assets/checkout/checked.png"
        alt="check-mark"
        width="20px"
        height="20px"
      />
    </div>
  );
};

export default OrderConfirmation;