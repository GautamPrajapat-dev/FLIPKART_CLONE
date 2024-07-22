import { takeLatest } from "redux-saga/effects";
import { PUBLIC_PROFILE_SAGA } from "../../Slice/Public.Auth.Slice.js";
import { Public_Profile_Handler } from "../Handler/Public.Auth.Handler";

export function* PublicProfileWatcher() {
  yield takeLatest(PUBLIC_PROFILE_SAGA.type, Public_Profile_Handler);
}
