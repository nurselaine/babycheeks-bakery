import React, { useState } from "react";
import LandingLayout from "../Layout/LandingLayout";
import TransactionPane from "../component/transaction/TransactionPane";
import data from '../utils/home_data.json';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import './Page.css';

const Checkout = () => {

  const [{options, isPending}] = usePayPalScriptReducer();

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "5.40"
          }
        }
      ]
    });
  }

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      console.log('transaction completed');
    })
  }
  const cookies= [0, 1, 2, 3, 4, 5];
  const [cost] = useState([5.4, 4.75, 8.99, 4.45, 5, 6.54]);
  return (
    <LandingLayout>
      <div className="checkout-page">
        <div className="store-items">
          {
            cookies.map((item, idx) => (
              <TransactionPane 
                item_img={data.cookie[idx]}
                title={data.cookie_title[idx]}
                desc={data.cookie_description[idx]}
                cost={cost[idx]}
                key={`${idx}`}
              />
            ))
          }
        </div>
        <button className="submitOrder-btn">Submit Order</button>
        <PayPalButtons 
          style={{ layout: "vertical"}}
          createOrder={(data, actions) => onCreateOrder(data, actions)}
          onApprove={(data,actions) => onApproveOrder(data, actions)}
        />
      </div>
    </LandingLayout>
  )
}

export default Checkout;