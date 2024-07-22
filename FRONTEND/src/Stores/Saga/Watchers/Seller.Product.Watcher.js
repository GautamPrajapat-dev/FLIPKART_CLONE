import { takeLatest } from "redux-saga/effects";
import {
  UpdateBrandLogoHandler,
  UpdateImagesHandler,
  UpdateProductHandler,
  UpdateThumbnailHandler,
  addNewProductHandler,
  delelteProductHandler,
  getDashBoardDetailsHandler,
  getProductHandler,
  getSingleProductHandler,
} from "../Handler/Seller.Product.Handler";
import { SellerProductActionRequest } from "../Actions/SellerProductsAction";

export function* getdetaildashboardWatcher() {
  yield takeLatest(
    SellerProductActionRequest.GET_DASHBOARD_DETAILS_SAGA_REQUEST,
    getDashBoardDetailsHandler
  );
}
export function* AddNewProductWatcher() {
  yield takeLatest(
    SellerProductActionRequest.AddNewProductSellerSaga,
    addNewProductHandler
  );
}
export function* getAllProductWatcher() {
  yield takeLatest(
    SellerProductActionRequest.GET_ALL_PRODUCTS_SAGA_REQUEST,
    getProductHandler
  );
}
export function* getSingleProductWatcher() {
  yield takeLatest(
    SellerProductActionRequest.GET_SINGLE_PRODUCT_SAGA_REQUEST,
    getSingleProductHandler
  );
}
export function* updateSellerProductWatcher() {
  yield takeLatest(
    SellerProductActionRequest.UPDATE_SELLER_PRODUCTS_SAGA_REQUEST,
    UpdateProductHandler
  );
}
export function* updateBrandLogoWatcher() {
  yield takeLatest(
    SellerProductActionRequest.UPDATE_SELLER_BRAND_LOGO_SAGA_REQUEST,
    UpdateBrandLogoHandler
  );
}
export function* updateThumbnailWatcher() {
  yield takeLatest(
    SellerProductActionRequest.UPDATE_SELLER_THUMBNAIL_SAGA_REQUEST,
    UpdateThumbnailHandler
  );
}
export function* updateImagesWatcher() {
  yield takeLatest(
    SellerProductActionRequest.UPDATE_SELLER_MULTIPLE_IMAGES_SAGA_REQUEST,
    UpdateImagesHandler
  );
}
export function* DeleteSellerProductWatcher() {
  yield takeLatest(
    SellerProductActionRequest.DELETE_SELLER_PRODUCT_SAGA_REQUEST,
    delelteProductHandler
  );
}
