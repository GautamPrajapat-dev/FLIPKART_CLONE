import { all } from "redux-saga/effects";

import {
  SellerProfileWatcher,
  SellerUpdateProfileWatcher,
} from "../Watchers/Seller.Auth.Watcher";
export function* rootSellerAuthSaga() {
  const arr = [SellerProfileWatcher(), SellerUpdateProfileWatcher()];

  yield all(arr);
}
