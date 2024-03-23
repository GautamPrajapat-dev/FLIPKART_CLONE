import { call, put } from "redux-saga/effects";
import { getDetails } from "../Services/Seller.Auth.Service";
import { SELLER_PRODFILE_REDUX } from "../../Slice/Seller.Auth.Slice";

export function* SellerProfileHandler() {
  try {
    const data = yield call(getDetails);
    yield put(SELLER_PRODFILE_REDUX(data));
  } catch (error) {
    console.log(error);
  }
}
