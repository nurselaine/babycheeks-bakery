import React, { useState } from "react";
import LandingLayout from "../Layout/LandingLayout";
import TransactionPane from "../component/transaction/TransactionPane";
import PayPalPayment from "../component/Transaction/PaypalPayment";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCart,
  processOrder,
  completeOrder,
} from "../Redux/actions/cartActions";
import Receipt from "../component/OrderSummary/Receipt";
import OrderConfirmation from "../component/OrderSummary/OrderConfirmation";
import "./Page.css";

const Checkout = () => {
  let menuItems = useSelector((state) => state.menuItems);
  const dispatch = useDispatch();
  const shoppingcart = useSelector((state) => state.shopping_cart);
  const orderProcessing = useSelector((state) => state.active_order);
  const order_id = useSelector((state) => state.order_id);
  const complete_order = useSelector((state) => state.complete_order);

  const handleOrderSubmit = () => {
    dispatch(loadCart());
    dispatch(processOrder());
  };

  return (
    <LandingLayout>
      {!complete_order && (
        <div>
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
              {orderProcessing && !order_id ? (
                <div className="stack-items">
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
            </div>
          </div>
        </div>
      )}

      {complete_order && (
        <div className="order-confirmation">
          <div className="stack-items">
            <OrderConfirmation order_id={order_id} />
            <Receipt />
            <button
              className="submitOrder-btn"
              onClick={() => dispatch(completeOrder())}
            >
              Shop More
            </button>
          </div>
        </div>
      )}
    </LandingLayout>
  );
};

export default Checkout;
