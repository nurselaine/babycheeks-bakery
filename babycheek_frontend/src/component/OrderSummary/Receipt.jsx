import React from "react";
import { useSelector } from "react-redux";
import "./Receipt.css";

const Receipt = () => {
  const shopping_cart = useSelector((state) => state.shopping_cart);

  return (
    <div className="receipt_ctn">
      <p>Order Summary</p>
      <div>
        {shopping_cart?.menu_item?.map((item) => (
          <div className="receipt_items">
            <p>
              {item.item_name} x {item.quantity}
            </p>
            <p>{item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="receipt_total">
        <div className="receipt_items">
          <p>subtotal: </p>
          <p >{shopping_cart.subtotal.toFixed(2)}</p>
        </div>
        <div className="receipt_items">
          <p>total: </p>
          <p>{shopping_cart.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;