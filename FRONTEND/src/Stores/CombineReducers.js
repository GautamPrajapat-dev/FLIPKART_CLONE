import { combineReducers } from "@reduxjs/toolkit";

import ProductsSlice from "./Slice/Products.Slice";
import SellerAuthSlice from "./Slice/Seller.Auth.Slice";
import SellerProductSlice from "./Slice/Seller.Product.Slice";
import loadingSlice from "./Slice/loading.Slice";

const reducer = combineReducers({
  SellerProduct: SellerProductSlice,
  Seller: SellerAuthSlice,
  loading: loadingSlice,
  products: ProductsSlice,
});
export default reducer;
