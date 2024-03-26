import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider, useDispatch } from "react-redux";
import configureStore from "./src/Redux/store";
import App from "./src/App";
import Checkout from "./src/Page/Checkout";
import DashboardLayout from "./src/Component/Dashboard/DashboardLayout";
import AccountOverview from "./src/Component/Dashboard/account/AccountOverview"
import CustomerOverview from "./src/Component/Dashboard/customers/CustomerOverview";
import OrdersOverview from "./src/Component/Dashboard/orders/OrdersOverview";
import DashboardOverview from "./src/Component/Dashboard/overview/DashboardOverview";

const store = configureStore();

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
    path: "/dashboard",
    element: <DashboardOverview/>
  },
  {
    path: "/dashboard/orders",
    element: <OrdersOverview/>
  },
  {
    // provide high level info on each customer
    path: "/dashboard/customers",
    element: <CustomerOverview/>
  },
  {
    path: "/dashboard/account",
    element: <AccountOverview/>
  },
  {
    path: "/dashboard/settings",
    element: <DashboardLayout/>
  }
]);

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
