import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = () => {
  let [orderApproved, setOrderApproved] = useState(false);
  const createOrder = async () => {
    // This function sets up the details of the transaction, including the amount and line item details.
    try {
      const response = await fetch("http://localhost:3001/pay/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // purchase_units[0].amount.value
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: "2",
                breakdown: {
                  item_total: {
                    /* Required when including the items array */
                    currency_code: "USD",
                    value: "2",
                  },
                },
              },
              items: [
                {
                  name: "Original Chocolate Chip cookie" /* Shows within upper-right dropdown during payment approval */,
                  description:
                    "Original Chocolate Chip cookie" /* Item details will also be in the completed paypal.com transaction view */,
                  unit_amount: {
                    currency_code: "USD",
                    value: "1",
                  },
                  quantity: "2",
                },
              ],
            },
          ],

          // product: [
          //   {
          //     name: "Original Chocolate Chip cookie",
          //     cost: "3.75",
          //   },
          // ],
          // purchase_units: [
          //   {
          //     reference_id: "default",
          //     amount: {
          //       value: "3.75",
          //       currency_code: "USD"
          //     }
          //   }
          // ]
        }),
      });

      console.log("ORDER SENT TO SERVER");
      // get response
      const orderData = await response.json();

      console.log("ORDER RESPONSE" + JSON.stringify(orderData));

      // check order id
      if (!orderData.id) {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
      console.log("ORDER ID::::::::::", orderData.id);
      return orderData.id;
    } catch (error) {
      console.error(error);
      console.log(`Could not initiate Paypal Checkout... ${error}`);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      console.log("APPROVE ORDER::::::: " + data);
      const orderID = data.orderID;
      const response = fetch(
        `http://localhost:3001/pay/api/orders/${orderID}/capture`,
        {
          method: "POST",
          body: JSON.stringify({
            orderID: orderID,
          }),
        }
      )
        .then((response) => response.json())
        .then((details) => {
          // This function shows a transaction success message to your buyer.
          alert("Transaction completed by " + details.payer.name.given_name);
          setOrderApproved(true);
        });

      const orderData = await response.json();

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
        resultMessage(
          `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
    } catch (error) {
      console.error(error);
      console.log(
        `Sorry, your transaction could not be processed...<br><br>${error}`
      );
    }
  };
  return (
    <div className="paypal-ctn">
        <PayPalButtons
          createOrder={() => createOrder()}
          onApprove={(data, actions) => onApprove(data, actions)}
    
        />
    </div>
  );
};

export default PayPalPayment;
