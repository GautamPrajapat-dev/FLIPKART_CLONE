import { configureStore } from "@reduxjs/toolkit";
import reducer from "./CombineReducers";
import createSagaMiddleware from "redux-saga";
import { rootSellerAuthSaga } from "./Saga/RootSaga/Root.Seller.Auth";
import { sellerProductsRootSaga } from "./Saga/RootSaga/Root.Seller.Product";
import { rootPublicAuthSaga } from "./Saga/RootSaga/Root.Public.Auth";
const sagaMiddleware = createSagaMiddleware();
const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSellerAuthSaga);
sagaMiddleware.run(sellerProductsRootSaga);
sagaMiddleware.run(rootPublicAuthSaga);

export default Store;

// const sagaMiddleware = createSagaMiddleware();
// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// });

// sagaMiddleware.run(rootCagategorySaga);
// export default store;
