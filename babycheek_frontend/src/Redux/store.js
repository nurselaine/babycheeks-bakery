import { createStore, applyMiddleware } from "redux";
import { initialState } from "./reducers/cartReducers";
import cartReducer from "./reducers/cartReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  cartReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware()
  )
);

export default store;