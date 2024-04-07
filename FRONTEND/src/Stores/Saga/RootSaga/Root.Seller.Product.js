import { all } from "redux-saga/effects";
import {
  AddNewProductWatcher,
  DeleteSellerProductWatcher,
  getAllProductWatcher,
  getSingleProductWatcher,
  updateBrandLogoWatcher,
  updateImagesWatcher,
  updateSellerProductWatcher,
  updateThumbnailWatcher,
} from "../Watchers/Seller.Product.Watcher";
import {
  SellerProfileWatcher,
  SellerUpdateProfileWatcher,
} from "../Watchers/Seller.Auth.Watcher";
export function* sellerProductsRootSaga() {
  const arr = [
    AddNewProductWatcher(),
    getAllProductWatcher(),
    SellerProfileWatcher(),
    SellerUpdateProfileWatcher(),
    getSingleProductWatcher(),
    updateSellerProductWatcher(),
    updateBrandLogoWatcher(),
    updateThumbnailWatcher(),
    updateImagesWatcher(),
    DeleteSellerProductWatcher(),
  ];

  yield all(arr);
}
