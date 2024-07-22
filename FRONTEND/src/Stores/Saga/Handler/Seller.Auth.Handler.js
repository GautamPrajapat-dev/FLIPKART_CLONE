import { call, put } from "redux-saga/effects";
import {
  getDetails,
  updateSellerDetails,
  updateSellerProfile,
} from "../Services/Seller.Auth.Service";
import {
  SELLER_PROFILE_REDUX,
  UPDATE_PROFILE_REDUX,
  UPDATE_SELLER_DETAILS_REDUX,
} from "../../Slice/Seller.Auth.Slice";
import { startLoading, stopLoading } from "../../Slice/loading.Slice";

export function* SellerProfileHandler() {
  try {
    yield put(startLoading());
    const data = yield call(getDetails);
    yield put(SELLER_PROFILE_REDUX(data));
    yield put(stopLoading());
  } catch (error) {
    // console.log(error);
    yield put(stopLoading());
  }
}
export function* SellerProfileUpdate(action) {
  try {
    const img = action.payload;

    const data = yield call(updateSellerProfile, img);
    yield put(UPDATE_PROFILE_REDUX(data));
  } catch (error) {
    // console.log(error);
  }
}

export function* Seller_Update_details_Handler(action) {
  try {
    const fromdata = action.payload;
    const data = yield call(updateSellerDetails, fromdata);
    yield put(UPDATE_SELLER_DETAILS_REDUX(data));
    // yield put(stopLoading());
  } catch (error) {
    // console.log(error.message);
  }
}
