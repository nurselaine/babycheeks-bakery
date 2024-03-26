import { createStore, applyMiddleware, combineReducers } from "redux";
// import {configureStore} from '@reduxjs/toolkit';
import cartReducer from "./reducers/cartReducers";
import dashboardReducer from "./reducers/dashboardReducer";
import { thunk } from "redux-thunk";

import monitorReducersEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger";
import { initialCartState } from "./reducers/cartReducers";
import { initialDashboardState } from "./reducers/dashboardReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  dashboard: dashboardReducer
});

const initialState = {
  cart: initialCartState,
  dashboard: initialDashboardState,
}

export default function configureStore(){
  const middlewares = [loggerMiddleware, thunk];

  // if (process.env.NODE_ENV === 'development') {
  //   middlewares.push(secretMiddleware)
  // }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  // const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  // const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, initialState, middlewareEnhancer);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers/cartReducers', () => store.replaceReducer(cartReducer))
  }

  return store
}