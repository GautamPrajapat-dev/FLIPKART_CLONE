import { createSlice } from "@reduxjs/toolkit";

const SellerProductSlice = createSlice({
  name: "SELLER_PRODUCT",
  initialState: {
    products: [],
    product: {},
  },

  reducers: {
    AddNewProductSellerSaga: (state, action) => {},
    AddNewProductRedux: (state, action) => {},
    GET_ALL_PRODUCTS_SAGA: (state, action) => {},
    getAllProdctsRedux: (state, action) => {
      state.products = action.payload;
    },
    GET_SINGLE_PRODUCT_SAGA: (state, action) => {},
    GET_SINGLE_PRODUCT_REDUX: (state, action) => {
      state.product = action.payload;
    },
  },
});
export const {
  getAllProdctsRedux,
  GET_ALL_PRODUCTS_SAGA,
  AddNewProductRedux,
  AddNewProductSellerSaga,
  GET_SINGLE_PRODUCT_REDUX,
  GET_SINGLE_PRODUCT_SAGA,
} = SellerProductSlice.actions;
export default SellerProductSlice.reducer;
