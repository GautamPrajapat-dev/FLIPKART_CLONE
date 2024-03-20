import { createSlice } from "@reduxjs/toolkit";

const SellerProductSlice = createSlice({
  name: "SELLER_PRODUCT",
  initialState: {
    products: [],
  },

  reducers: {
    AddNewProductSellerSaga: (state, action) => {},
    AddNewProductRedux: (state, action) => {},
    GET_ALL_PRODUCTS_SAGA: (state, action) => {},
    getAllProdctsRedux: (state, action) => {
      state.products = action.payload;
    },
  },
});
export const {
  getAllProdctsRedux,
  GET_ALL_PRODUCTS_SAGA,
  AddNewProductRedux,
  AddNewProductSellerSaga,
} = SellerProductSlice.actions;
export default SellerProductSlice.reducer;
