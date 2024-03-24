import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import monitorReducersEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger";
import { initialState } from "./reducers/cartReducers";
import cartReducer from "./reducers/cartReducers";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(){
  const middlewares = [loggerMiddleware, thunk];

  // if (process.env.NODE_ENV === 'development') {
  //   middlewares.push(secretMiddleware)
  // }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(cartReducer, initialState, composedEnhancers);

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers/cartReducers', () => store.replaceReducer(cartReducer))
  // }

  return store
}