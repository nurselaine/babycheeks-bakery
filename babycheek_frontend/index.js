import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from "./src/App";
import Checkout from "./src/Page/Checkout";

const initialOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENTID,
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
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PayPalScriptProvider options={initialOptions}>
    <RouterProvider router={router} />
  </PayPalScriptProvider>
)

// react-dom is an entry point to the DOM (Document Object model) and server renderers for React
// It is used to add elements to the DOM so react apps can work. It is intended to be paired with React
// React-dom is being used to inject contents of App.js to the root div in index.html file
