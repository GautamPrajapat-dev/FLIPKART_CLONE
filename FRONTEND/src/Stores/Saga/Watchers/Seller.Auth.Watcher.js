import { takeLatest } from "redux-saga/effects";
import {
  SellerProfileHandler,
  SellerProfileUpdate,
  Seller_Update_details_Handler,
} from "../Handler/Seller.Auth.Handler";
import {
  SELLER_PROFILE_SAGA,
  UPDATE_PROFILE_SAGA,
  UPDATE_SELLER_DETAILS_SAGA,
} from "../../Slice/Seller.Auth.Slice";
export function* SellerProfileWatcher() {
  yield takeLatest(SELLER_PROFILE_SAGA.type, SellerProfileHandler);
}
export function* SellerUpdateProfileWatcher() {
  yield takeLatest(UPDATE_PROFILE_SAGA.type, SellerProfileUpdate);
}
export function* SellerUpdateDetailsWatcher() {
  yield takeLatest(
    UPDATE_SELLER_DETAILS_SAGA.type,
    Seller_Update_details_Handler
  );
}
