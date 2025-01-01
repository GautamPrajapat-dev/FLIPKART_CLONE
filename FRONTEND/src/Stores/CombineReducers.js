import { combineReducers } from '@reduxjs/toolkit';

import SellerAuthSlice from './Slice/Seller.Auth.Slice';
import SellerProductSlice from './Slice/Seller.Product.Slice';

import PublicAuthSlce from './Slice/Public.Auth.Slice';
import product from './Slice/Products.Slice';
import cart from './Slice/Cart.Slice';
const reducer = combineReducers({
  SellerProduct: SellerProductSlice,
  Seller: SellerAuthSlice,
  user: PublicAuthSlce,
  cart: cart,
  products: product,
});
export default reducer;
