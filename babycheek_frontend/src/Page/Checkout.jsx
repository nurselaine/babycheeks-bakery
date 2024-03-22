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
  const customer_info = useSelector((state) => state.customer_info);
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
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <button
                className="submitOrder-btn"
                onClick={() => dispatch(processOrder())}
              >
                Go Back
              </button>
              {/* <CustomerInfoForm /> */}
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
          {orderProcessing && !order_id && <PayPalPayment />}
          {order_id && <p>Order ID: {order_id}</p>}
        </div>
      </div>
    </LandingLayout>
  );
};

export const CustomerInfoForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleCustomerInfoSubmit = () => {
    if (firstname.length == 0 || lastname.length == 0) {
      alert(
        "Please enter valid first and last name for order pick-up and verification"
      );
      return;
    }
    dispatch(addCustomerInfo(firstname, lastname));
    setFirstname("");
    setLastname("");
    setSuccess(true);
  };
  return (
    <div className="customer_form">
      <div>
        <p>Enter Your Name:</p>
        <div style={{display: 'flex', flexDirection:'column'}}>
          <input
            name="firstname"
            placeholder="firstname"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            name="lastname"
            placeholder="lastname"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <button className="submitOrder-btn" onClick={() => handleCustomerInfoSubmit()}>
          {success ? "Edit" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
