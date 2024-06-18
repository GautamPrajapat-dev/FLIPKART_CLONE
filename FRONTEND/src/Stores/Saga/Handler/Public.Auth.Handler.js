import { call, put } from "redux-saga/effects";
import { getDetials } from "../Services/Public.Products.Service";
import { PUBLIC_PROFILE_REDUX } from "../../Slice/Public.Auth.Slce";

export function* Public_Profile_Handler() {
  try {
    const data = yield call(getDetials);
    yield put(PUBLIC_PROFILE_REDUX(data));
    // yield put(stopLoading());
  } catch (error) {
    console.log(error.message);
  }
}
