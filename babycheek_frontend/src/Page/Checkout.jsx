import React, { useState } from "react";
import LandingLayout from "../Layout/LandingLayout";
import TransactionPane from "../component/transaction/TransactionPane";
import PayPalPayment from "../component/Transaction/PaypalPayment";
import { useDispatch, useSelector } from "react-redux";
import { loadCart } from "../Redux/actions/cartActions";
import "./Page.css";

const Checkout = () => {

  let [submitOrder, setSubmitOrder] = useState(false);
  let menuItems = useSelector(state => state.menuItems);
  const dispatch = useDispatch();
  const shoppingcart = useSelector(state => state.shoppingcart);
  console.log("SHOPPING CART:::::",shoppingcart);

  const handleOrderSubmit = () => {
    setSubmitOrder(true);
    dispatch(loadCart());
  }

  return (
    <LandingLayout>
      <div className="checkout-page">
        <div className="store-items">
          {menuItems.map((item, idx) => (
            <TransactionPane
              item_id={item.item_id}
              key={`item_key_${idx}`}
            />
          ))}
        </div>
        <div className="submit-ctn">
          <button className="submitOrder-btn" onClick={() => handleOrderSubmit()}>Submit Order</button>
          {submitOrder && <PayPalPayment />}
        </div>
      </div>
    </LandingLayout>
  );
};

export default Checkout;
