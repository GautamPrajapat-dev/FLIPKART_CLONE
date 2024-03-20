import { configureStore } from "@reduxjs/toolkit";
import reducer from "./CombineReducers";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./Saga/Root.Saga";
const sagaMiddleware = createSagaMiddleware();
const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default Store;

// const sagaMiddleware = createSagaMiddleware();
// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// });

// sagaMiddleware.run(rootCagategorySaga);
// export default store;
