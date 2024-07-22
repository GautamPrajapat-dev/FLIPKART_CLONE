import { takeLatest } from "redux-saga/effects";
import {
  SellerProfileHandler,
  SellerProfileUpdate,
  Seller_Update_details_Handler,
} from "../Handler/Seller.Auth.Handler";

import { SellerAuthActionRequest } from "../Actions/SellerAuthAction";
export function* SellerProfileWatcher() {
  yield takeLatest(
    SellerAuthActionRequest.SELLER_PROFILE_SAGA_REQUEST,
    SellerProfileHandler
  );
}
export function* SellerUpdateProfileWatcher() {
  yield takeLatest(
    SellerAuthActionRequest.UPDATE_PROFILE_SAGA_REQUEST,
    SellerProfileUpdate
  );
}
export function* SellerUpdateDetailsWatcher() {
  yield takeLatest(
    SellerAuthActionRequest.UPDATE_SELLER_DETAILS_SAGA_REQUEST,
    Seller_Update_details_Handler
  );
}
