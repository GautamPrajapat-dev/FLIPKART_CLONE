import { all } from "redux-saga/effects";

import {
  SellerProfileWatcher,
  SellerUpdateDetailsWatcher,
  SellerUpdateProfileWatcher,
} from "../Watchers/Seller.Auth.Watcher";
export function* rootSellerAuthSaga() {
  const arr = [
    SellerProfileWatcher(),
    SellerUpdateProfileWatcher(),
    SellerUpdateDetailsWatcher(),
  ];

  yield all(arr);
}
