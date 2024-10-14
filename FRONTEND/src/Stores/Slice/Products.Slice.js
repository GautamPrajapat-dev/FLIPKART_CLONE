import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "product",
  initialState: {
    category: {
      isloading: false,
      data: [],
    },
    subcategory: {
      isloading: false,
      data: [],
    },
    subCategoryProducts: {
      isloading: false,
      data: [],
    },
    whitelist: {
      isloading: false,
      data: [],
      msg: {},
    },
  },
  reducers: {
    CATEGORY_REDUX_SAGA: (state) => {
      state.category.isloading = true;
    },
    CATEGORY_REDUX: (state, action) => {
      state.category.isloading = false;
      state.category.data = action.payload;
    },
    GET_WHITELIST_SAGA: (state) => {
      state.whitelist.isloading = true;
    },
    GET_WHITELIST: (state, action) => {
      state.whitelist.isloading = false;
      state.whitelist.data = action.payload;
    },
    ADD_WHITELIST: (state, action) => {
      state.whitelist.msg = action.payload;
    },
    REMOVE_WHITELIST: (state, action) => {
      state.whitelist.msg = action.payload;
    },
    SUBCATEGORY_WITH_PRODUCTS_SAGA: (state) => {
      state.subcategory.isloading = true;
    },
    SUBCATEGORY_WITH_PRODUCTS: (state, action) => {
      state.subcategory.isloading = false;
      state.subcategory.data = action.payload;
    },
    SUBCATEGORY_WITH_ALL_PRODUCTS_SAGA: (state) => {
      state.subCategoryProducts.isloading = true;
    },
    SUBCATEGORY_WITH_ALL_PRODUCTS: (state, action) => {
      state.subCategoryProducts.isloading = false;
      state.subCategoryProducts.data = action.payload;
    },
  },
});
export const {
  AllProductRedux,
  CATEGORY_REDUX,
  GET_WHITELIS,
  SUBCATEGORY_WITH_PRODUCTS,
  SUBCATEGORY_WITH_ALL_PRODUCTS,
} = product.actions;
export default product.reducer;
