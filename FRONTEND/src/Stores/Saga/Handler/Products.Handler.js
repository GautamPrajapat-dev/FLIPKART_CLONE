import { call, put } from "redux-saga/effects";
import {
  category,
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
      payload: data?.data,
    });
  } catch (error) {
    console.log(error);
  }
}
