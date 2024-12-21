import { all, takeEvery, takeLatest } from "redux-saga/effects";
import {
  addwhiteListHandler,
  CategoryHandler,
  removewhiteListHandler,
  subCategoryHandler,
  subCategoryWithproductHandler,
  whiteListHandler,
} from "../Handler/Products.Handler";
import {
  CategoryRequestSaga,
  GetWhiteListReqSaga,
  productActionRequest,
  SubCategoryDataSaga,
  AddWhiteListReqSaga,
  SubCategoryReqSaga,
} from "../Actions/ProductsAction";

// export function* AllProductsWatcher() {
//   yield takeLatest("all/r", AllProductsHandler);
// }
export function* categoryWatcher() {
  yield takeLatest(CategoryRequestSaga().type, CategoryHandler);
}
export function* subcategoryWatcher() {
  yield takeLatest(SubCategoryReqSaga().type, subCategoryHandler);
}
export function* subcategoryAllproductWatcher() {
  yield takeEvery(SubCategoryDataSaga().type, subCategoryWithproductHandler);
}
export function* getWhhiteListWatcher() {
  yield takeLatest(GetWhiteListReqSaga().type, whiteListHandler);
}
export function* addWhhiteListWatcher() {
  yield takeLatest(AddWhiteListReqSaga().type, addwhiteListHandler);
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
