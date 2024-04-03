import { all } from "redux-saga/effects";
import {
  AddNewProductWatcher,
  getAllProductWatcher,
  getSingleProductWatcher,
} from "./Watchers/Seller.Product.Watcher";
import {
  SellerProfileWatcher,
  SellerUpdateProfileWatcher,
} from "./Watchers/Seller.Auth.Watcher";
export function* rootSaga() {
  const arr = [
    AddNewProductWatcher(),
    getAllProductWatcher(),
    SellerProfileWatcher(),
    SellerUpdateProfileWatcher(),
    getSingleProductWatcher(),
  ];

  yield all(arr);
}
