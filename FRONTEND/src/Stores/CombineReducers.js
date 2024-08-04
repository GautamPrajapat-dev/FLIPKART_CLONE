import { combineReducers } from "@reduxjs/toolkit";

import SellerAuthSlice from "./Slice/Seller.Auth.Slice";
import SellerProductSlice from "./Slice/Seller.Product.Slice";
import loadingSlice from "./Slice/loading.Slice";
import PublicAuthSlce from "./Slice/Public.Auth.Slice";
import product from "./Slice/Products.Slice";

const reducer = combineReducers({
  SellerProduct: SellerProductSlice,
  Seller: SellerAuthSlice,
  user: PublicAuthSlce,
  loading: loadingSlice,
  products: product,
});
export default reducer;
