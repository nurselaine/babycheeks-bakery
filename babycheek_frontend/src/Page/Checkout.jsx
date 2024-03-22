import React, { useState } from "react";
import LandingLayout from "../Layout/LandingLayout";
import TransactionPane from "../component/transaction/TransactionPane";
import PayPalPayment from "../component/Transaction/PaypalPayment";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCart,
  processOrder,
  addCustomerInfo,
} from "../Redux/actions/cartActions";
import "./Page.css";
import Receipt from "../component/OrderSummary/Receipt";

const Checkout = () => {
  let menuItems = useSelector((state) => state.menuItems);
  const dispatch = useDispatch();
  const shoppingcart = useSelector((state) => state.shopping_cart);
  const orderProcessing = useSelector((state) => state.active_order);
  const order_id = useSelector((state) => state.order_id);

  const handleOrderSubmit = () => {
    dispatch(loadCart());
    dispatch(processOrder());
  };

  return (
    <LandingLayout>
      <div className="checkout-page">
        <div className="store-items">
          {!orderProcessing
            ? menuItems.map((item, idx) => (
                <TransactionPane
                  item_id={item.item_id}
                  key={`item_key_${idx}`}
                />
              ))
            : shoppingcart.menu_item.map((item, idx) => (
                <TransactionPane
                  item_id={item.item_id}
                  key={`item_key_${idx}`}
                />
              ))}
        </div>
        <div className="submit-ctn">
          {orderProcessing ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                className="submitOrder-btn"
                onClick={() => dispatch(processOrder())}
              >
                Go Back
              </button>
              <Receipt />
            </div>
          ) : (
            <button
              className="submitOrder-btn"
              onClick={() => handleOrderSubmit()}
            >
              Submit Order
            </button>
          )}
          {orderProcessing && <PayPalPayment />}

          {order_id && <OrderConfirmation order_id={order_id} />}
        </div>
      </div>
    </LandingLayout>
  );
};

export const OrderConfirmation = ({ order_id }) => {
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

export default Checkout;
