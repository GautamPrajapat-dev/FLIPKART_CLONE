import { all } from "redux-saga/effects";
import {
  AddNewProductWatcher,
  getAllProductWatcher,
} from "./Watchers/Seller.Product.Watcher";
import { SellerProfileWatcher } from "./Watchers/Seller.Auth.Watcher";
export function* rootSaga() {
  const arr = [
    AddNewProductWatcher(),
    getAllProductWatcher(),
    SellerProfileWatcher(),
  ];

  yield all(arr);
}
