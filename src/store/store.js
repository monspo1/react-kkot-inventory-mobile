// // import { applyMiddleware, createStore } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { mainMiddleware } from '../middleware/middleware'
// // import logger, { createLogger } from 'redux-logger';
// import thunk from "redux-thunk";
// import rootReducer from '../reducers/reducer'

// // const logger = createLogger();

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: [thunk, mainMiddleware],
//     // middleware: applyMiddleware(thunk, logger)
// });
  
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import rootReducer from '../reducers/reducer'
import { mainMiddleware } from '../middleware/middleware'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
  }).concat(thunk, mainMiddleware),
});
  
export default store;