import { combineReducers } from "@reduxjs/toolkit";

import ProductsSlice from "./Slice/Products.Slice";
import SellerAuthSlice from "./Slice/Seller.Auth.Slice";
import SellerProductSlice from "./Slice/Seller.Product.Slice";

const reducer = combineReducers({
  SellerProduct: SellerProductSlice,
  Seller: SellerAuthSlice,
  products: ProductsSlice,
});
export default reducer;
