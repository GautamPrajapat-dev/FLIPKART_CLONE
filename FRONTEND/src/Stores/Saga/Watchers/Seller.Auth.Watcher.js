import { takeLatest } from "redux-saga/effects";
import { SellerProfileHandler } from "../Handler/Seller.Auth.Handler";
import { SELLER_PROFILE_SAGA } from "../../Slice/Seller.Auth.Slice";
export function* SellerProfileWatcher() {
  yield takeLatest(SELLER_PROFILE_SAGA.type, SellerProfileHandler);
}
