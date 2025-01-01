import { configureStore } from "@reduxjs/toolkit";
import reducer from "./CombineReducers";
import createSagaMiddleware from "redux-saga";
import { rootSellerAuthSaga } from "./Watchers/Seller.Auth.Watcher";
import { productsRoot } from "./Watchers/Products.Watcher";
import { rootPublicAuthSaga } from "./Watchers/Public.Watcher";
import { sellerProductsRootSaga } from "./Watchers/Seller.Product.Watcher";
const sagaMiddleware = createSagaMiddleware();
const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSellerAuthSaga);
sagaMiddleware.run(sellerProductsRootSaga);
sagaMiddleware.run(productsRoot);
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
