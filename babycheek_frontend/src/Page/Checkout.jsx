import React, { useState } from "react";
import LandingLayout from "../Layout/LandingLayout";
import TransactionPane from "../component/transaction/TransactionPane";
import PayPalPayment from "../component/Transaction/PaypalPayment";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, processOrder } from "../Redux/actions/cartActions";
import "./Page.css";

const Checkout = () => {
  let menuItems = useSelector((state) => state.menuItems);
  const dispatch = useDispatch();
  const shoppingcart = useSelector((state) => state.shopping_cart);
  const orderProcessing = useSelector((state) => state.active_order);

  const handleOrderSubmit = () => {
    setSubmitOrder(true);
    dispatch(loadCart());
    dispatch(processOrder());
  };

  console.log("SHOPPING CART:::::", shoppingcart);
  console.log("ORDER PROCESSING STATUS", orderProcessing);
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
            <button
              className="submitOrder-btn"
              onClick={() => dispatch(processOrder())}
            >
              Go Back
            </button>
          ) : (
            <button
              className="submitOrder-btn"
              onClick={() => handleOrderSubmit()}
            >
              Submit Order
            </button>
          )}

          {orderProcessing && <PayPalPayment />}
        </div>
      </div>
    </LandingLayout>
  );
};

export default Checkout;
