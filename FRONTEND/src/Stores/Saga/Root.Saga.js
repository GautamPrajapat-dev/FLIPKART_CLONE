import { all } from "redux-saga/effects";
import {
  AddNewProductWatcher,
  getAllProductWatcher,
} from "./Watchers/Seller.Product.Watcher";
export function* rootSaga() {
  const arr = [AddNewProductWatcher(), getAllProductWatcher()];

  yield all(arr);
}
