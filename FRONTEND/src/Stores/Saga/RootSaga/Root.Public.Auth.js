import { all } from "redux-saga/effects";
import { PublicProfileWatcher } from "../Watchers/Public.Watcher";

export function* rootPublicAuthSaga() {
  const arr = [PublicProfileWatcher()];

  yield all(arr);
}
