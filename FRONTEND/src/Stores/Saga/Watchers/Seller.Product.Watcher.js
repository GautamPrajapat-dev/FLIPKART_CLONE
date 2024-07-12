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
import { SellerProductAction } from "../Actions/SellerProductsAction";

export function* getdetaildashboardWatcher() {
  yield takeLatest(
    SellerProductAction.GET_DASHBOARD_DETAILS_SAGA,
    getDashBoardDetailsHandler
  );
}
export function* AddNewProductWatcher() {
  yield takeLatest(
    SellerProductAction.AddNewProductSellerSaga,
    addNewProductHandler
  );
}
export function* getAllProductWatcher() {
  yield takeLatest(
    SellerProductAction.GET_ALL_PRODUCTS_SAGA,
    getProductHandler
  );
}
export function* getSingleProductWatcher() {
  yield takeLatest(
    SellerProductAction.GET_SINGLE_PRODUCT_SAGA,
    getSingleProductHandler
  );
}
export function* updateSellerProductWatcher() {
  yield takeLatest(
    SellerProductAction.UPDATE_SELLER_PRODUCTS_SAGA,
    UpdateProductHandler
  );
}
export function* updateBrandLogoWatcher() {
  yield takeLatest(
    SellerProductAction.UPDATE_SELLER_BRAND_LOGO_SAGA,
    UpdateBrandLogoHandler
  );
}
export function* updateThumbnailWatcher() {
  yield takeLatest(
    SellerProductAction.UPDATE_SELLER_THUMBNAIL_SAGA,
    UpdateThumbnailHandler
  );
}
export function* updateImagesWatcher() {
  yield takeLatest(
    SellerProductAction.UPDATE_SELLER_MULTIPLE_IMAGES_SAGA,
    UpdateImagesHandler
  );
}
export function* DeleteSellerProductWatcher() {
  yield takeLatest(
    SellerProductAction.DELETE_SELLER_PRODUCT_SAGA,
    delelteProductHandler
  );
}
