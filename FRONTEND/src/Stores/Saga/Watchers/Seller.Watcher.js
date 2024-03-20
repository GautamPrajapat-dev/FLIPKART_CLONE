import { takeLatest } from "redux-saga/effects";
import { AllProductsHandler } from "../Handler/Products.Handler";
export function* AllProductsWatcher() {
  yield takeLatest("register", AllProductsHandler);
}
