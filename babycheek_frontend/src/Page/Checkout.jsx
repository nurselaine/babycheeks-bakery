import React from "react";
import LandingLayout from "../Layout/LandingLayout";
import TransactionPane from "../component/transaction/TransactionPane";
import './Page.css';

let cookies = [0, 1, 2, 3, 4, 5];

const Checkout = () => {
  return (
    <LandingLayout>
      <div className="checkout-page">
        <div className="store-items">
          {
            cookies.map((c) => (
              <TransactionPane 
                item_img={'./assets/item/cookie_butter_cookie.png'}
                title={'cookie butter cookie'}
                desc={'so ymmy and delicious yumm lala mummsidnsja.'} 
                cost={5}
              />
            ))
          }
        </div>
        <button className="submitOrder-btn">Submit Order</button>
      </div>
    </LandingLayout>
  )
}

export default Checkout;