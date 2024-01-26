import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./src/App";
import Checkout from "./src/Page/Checkout";

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
  <RouterProvider router={router} />
)

// react-dom is an entry point to the DOM (Document Object model) and server renderers for React
// It is used to add elements to the DOM so react apps can work. It is intended to be paired with React
// React-dom is being used to inject contents of App.js to the root div in index.html file
