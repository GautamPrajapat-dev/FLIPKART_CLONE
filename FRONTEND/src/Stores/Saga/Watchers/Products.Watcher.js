import { all, takeLatest } from "redux-saga/effects";
import {
  CategoryHandler,
  subCategoryHandler,
  subCategoryWithproductHandler,
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

// MARK: ROOT PRODUCT SAGA
export function* productsRoot() {
  const arr = [
    categoryWatcher(),
    subcategoryWatcher(),
    subcategoryAllproductWatcher(),
  ];
  yield all(arr);
}
