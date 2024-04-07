import { takeLatest } from "redux-saga/effects";
import {
  AddNewProductSellerSaga,
  DELETE_SELLER_PRODUCT_SAGA,
  GET_ALL_PRODUCTS_SAGA,
  GET_SINGLE_PRODUCT_SAGA,
  UPDATE_SELLER_BRAND_LOGO_SAGA,
  UPDATE_SELLER_MULTIPLE_IMAGES_SAGA,
  UPDATE_SELLER_PRODUCTS_SAGA,
  UPDATE_SELLER_THUMBNAIL_SAGA,
} from "../../Slice/Seller.Product.Slice";
import {
  UpdateBrandLogoHandler,
  UpdateImagesHandler,
  UpdateProductHandler,
  UpdateThumbnailHandler,
  addNewProductHandler,
  delelteProductHandler,
  getProductHandler,
  getSingleProductHandler,
} from "../Handler/Seller.Product.Handler";

export function* AddNewProductWatcher() {
  yield takeLatest(AddNewProductSellerSaga.type, addNewProductHandler);
}
export function* getAllProductWatcher() {
  yield takeLatest(GET_ALL_PRODUCTS_SAGA.type, getProductHandler);
}
export function* getSingleProductWatcher() {
  yield takeLatest(GET_SINGLE_PRODUCT_SAGA.type, getSingleProductHandler);
}
export function* updateSellerProductWatcher() {
  yield takeLatest(UPDATE_SELLER_PRODUCTS_SAGA.type, UpdateProductHandler);
}
export function* updateBrandLogoWatcher() {
  yield takeLatest(UPDATE_SELLER_BRAND_LOGO_SAGA.type, UpdateBrandLogoHandler);
}
export function* updateThumbnailWatcher() {
  yield takeLatest(UPDATE_SELLER_THUMBNAIL_SAGA.type, UpdateThumbnailHandler);
}
export function* updateImagesWatcher() {
  yield takeLatest(
    UPDATE_SELLER_MULTIPLE_IMAGES_SAGA.type,
    UpdateImagesHandler
  );
}
export function* DeleteSellerProductWatcher() {
  yield takeLatest(DELETE_SELLER_PRODUCT_SAGA.type, delelteProductHandler);
}
