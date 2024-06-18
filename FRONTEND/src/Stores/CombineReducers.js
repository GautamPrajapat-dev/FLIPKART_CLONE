import { combineReducers } from "@reduxjs/toolkit";

import ProductsSlice from "./Slice/Products.Slice";
import SellerAuthSlice from "./Slice/Seller.Auth.Slice";
import SellerProductSlice from "./Slice/Seller.Product.Slice";
import loadingSlice from "./Slice/loading.Slice";
import PublicAuthSlce from "./Slice/Public.Auth.Slce";

const reducer = combineReducers({
  SellerProduct: SellerProductSlice,
  Seller: SellerAuthSlice,
  User: PublicAuthSlce,
  loading: loadingSlice,
  products: ProductsSlice,
});
export default reducer;
