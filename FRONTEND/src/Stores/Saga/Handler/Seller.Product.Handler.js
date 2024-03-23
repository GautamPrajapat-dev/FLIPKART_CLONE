import { call, put } from "redux-saga/effects";
import {
  getAllProduct,
  postNewProduct,
} from "../Services/Seller.Product.Services";
import {
  AddNewProductRedux,
  getAllProdctsRedux,
} from "../../Slice/Seller.Product.Slice";

export function* addNewProductHandler(action) {
  try {
    const data = action.payload;
    const postData = yield call(postNewProduct, data);
    yield put(AddNewProductRedux(postData));
  } catch (error) {
    console.log(error);
  }
}

export function* getProductHandler(action) {
  try {
    const data = action?.payload;

    const getData = yield call(getAllProduct, data);
    yield put(getAllProdctsRedux(getData));
  } catch (error) {
    console.log(error);
  }
}
