import { call, put } from "redux-saga/effects";
import {
  addProductWhitelistService,
  category,
  getWhitelistService,
  removeProductWhitelistService,
  subcategoryAllproducts,
  subcategorywithproducts,
} from "../Services/Public.Products.Service";
import { productActionSuccess } from "../Actions/ProductsAction";
// import { CATEGORY_REDUX } from "../../Slice/Products.Slice";

export function* CategoryHandler() {
  try {
    const data = yield call(category);

    yield put({
      type: productActionSuccess.CATEGORY_REQUEST_SUCCESS,
      payload: data?.product,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* subCategoryHandler(action) {
  try {
    const subcategory = action.payload;

    const data = yield call(subcategorywithproducts, subcategory);

    yield put({
      type: productActionSuccess.SUB_CATEGORY_REQUEST_SUCCESS,
      payload: data?.product,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* subCategoryWithproductHandler(action) {
  try {
    const path = action.payload;
    const data = yield call(subcategoryAllproducts, path);

    yield put({
      type: productActionSuccess.SUB_CATEGORY_ALL_DATA_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* whiteListHandler() {
  try {
    const data = yield call(getWhitelistService);
    yield put({
      type: productActionSuccess.GET_WHITELIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* removewhiteListHandler(action) {
  try {
    const data = yield call(removeProductWhitelistService, action);
    yield put({
      type: productActionSuccess.REMOVE_WHITELIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* addwhiteListHandler(action) {
  try {
    const data = yield call(addProductWhitelistService, action);
    yield put({
      type: productActionSuccess.ADD_WHITELIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}
