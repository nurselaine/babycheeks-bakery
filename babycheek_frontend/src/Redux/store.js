import { createStore, applyMiddleware, compose } from "redux";
// import {configureStore} from '@reduxjs/toolkit';
import cartReducer from "./reducers/cartReducers";
import { thunk } from "redux-thunk";

import monitorReducersEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger";
import { initialState } from "./reducers/cartReducers";

// const preloadedState = initialState;
// const middleware = [...getDefaultMiddleware(), loggerMiddleware];

// const store = configureStore({
//   reducer: cartReducer,
//   middleware: middleware,
//   enhancers: [monitorReducersEnhancer],
//   preloadedState: preloadedState
// });

// // hot module replacement - feature from webpack that allows modules
// // to be replaced while an app is running without generating a full
// // reload
// // whenever cart reducers is updated, and executes it's callback fn 
// // when the module is updated
// if(process.env.NODE_ENV !== 'production' && module.hot){
//   module.hot.accept('./reducers/cartReducers', () => {
//     const newRootReducer = require('./reducers/cartReducers').default;
//     store.replaceReducer(newRootReducer);
//   });
// }


// export default store;

export default function configureStore(){
  const middlewares = [loggerMiddleware, thunk];

  // if (process.env.NODE_ENV === 'development') {
  //   middlewares.push(secretMiddleware)
  // }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  // const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  // const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(cartReducer, initialState);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers/cartReducers', () => store.replaceReducer(cartReducer))
  }

  return store
}