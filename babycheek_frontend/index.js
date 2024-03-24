import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import App from "./src/App";
import Checkout from "./src/Page/Checkout";
import OrderFulfillment from "./src/Page/OrderFulfillment";
const initialOptions = {
  "client-id": process.env.PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture"
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path: "/orders",
    element: <OrderFulfillment />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PayPalScriptProvider options={initialOptions}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
)

// react-dom is an entry point to the DOM (Document Object model) and server renderers for React
// It is used to add elements to the DOM so react apps can work. It is intended to be paired with React
// React-dom is being used to inject contents of App.js to the root div in index.html file
