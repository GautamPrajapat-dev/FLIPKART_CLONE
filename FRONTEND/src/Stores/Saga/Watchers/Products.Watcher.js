import { all, takeLatest } from "redux-saga/effects";
import {
  addwhiteListHandler,
  CategoryHandler,
  removewhiteListHandler,
  subCategoryHandler,
  subCategoryWithproductHandler,
  whiteListHandler,
} from "../Handler/Products.Handler";
import { productActionRequest } from "../Actions/ProductsAction";

// export function* AllProductsWatcher() {
//   yield takeLatest("all/r", AllProductsHandler);
// }
export function* categoryWatcher() {
  yield takeLatest(productActionRequest.CATEGORY_REQUEST_SAGA, CategoryHandler);
}
export function* subcategoryWatcher() {
  yield takeLatest(
    productActionRequest.SUB_CATEGORY_REQUEST_SAGA,
    subCategoryHandler
  );
}
export function* subcategoryAllproductWatcher() {
  yield takeLatest(
    productActionRequest.SUB_CATEGORY_ALl_DATA_REQUEST_SAGA,
    subCategoryWithproductHandler
  );
}
export function* getWhhiteListWatcher() {
  yield takeLatest(
    productActionRequest.GET_WHITELIST_REQUEST_SAGA,
    whiteListHandler
  );
}
export function* addWhhiteListWatcher() {
  yield takeLatest(
    productActionRequest.ADD_WHITELIST_REQUEST_SAGA,
    addwhiteListHandler
  );
}
export function* removeWhhiteListWatcher() {
  yield takeLatest(
    productActionRequest.REMOVE_WHITELIST_REQUEST_SAGA,
    removewhiteListHandler
  );
}

// MARK: ROOT PRODUCT SAGA
export function* productsRoot() {
  const arr = [
    categoryWatcher(),
    subcategoryWatcher(),
    addWhhiteListWatcher(),
    removeWhhiteListWatcher(),
    subcategoryAllproductWatcher(),
    getWhhiteListWatcher(),
  ];
  yield all(arr);
}
