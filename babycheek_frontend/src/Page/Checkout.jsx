import React, { useState } from "react";
import LandingLayout from "../Layout/LandingLayout";
import TransactionPane from "../component/transaction/TransactionPane";
import data from "../utils/home_data.json";
import PayPalPayment from "../component/Transaction/PaypalPayment";
import "./Page.css";

const Checkout = () => {

  const cookies = [0, 1, 2, 3, 4, 5];
  const [cost] = useState([5.4, 4.75, 8.99, 4.45, 5, 6.54]);

  return (
    <LandingLayout>
      <div className="checkout-page">
        <div className="store-items">
          {cookies.map((item, idx) => (
            <TransactionPane
              item_img={data.cookie[idx]}
              title={data.cookie_title[idx]}
              desc={data.cookie_description[idx]}
              cost={cost[idx]}
              key={`${idx}`}
            />
          ))}
        </div>
        <div className="submit-ctn">
          <button className="submitOrder-btn">Submit Order</button>
          <PayPalPayment />
        </div>
      </div>
    </LandingLayout>
  );
};

export default Checkout;
