import { createSlice } from "@reduxjs/toolkit";

const SellerProductSlice = createSlice({
  name: "sProduct",
  initialState: {
    addProduct: {
      isloading: false,
    },
    products: [],
    product: {},
    updateProducts: {},
    Brand_logo: {},
    thumbnail: {},
    Images: {},
    dashboard: {},
    delete: {},
    debugger: {},
  },

  reducers: {
    AddNewProductSellerSaga: (state) => {
      state.addProduct.isloading = true;
    },
    AddNewProductRedux: (state) => {
      state.addProduct.isloading = false;
    },
    AddNewProductSellerSaga_ERROR: (state) => {
      state.addProduct.isloading = false;
    },
    GET_DASHBOARD_DETAILS_REDUX: (state, action) => {
      state.dashboard = action.payload;
    },
    getAllProdctsRedux: (state, action) => {
      state.products = action.payload;
    },
    GET_SINGLE_PRODUCT_REDUX: (state, action) => {
      state.product = action.payload;
    },
    UPDATE_SELLER_PRODUCTS_REDUX: (state, action) => {
      state.updateProducts = action.payload;
    },
    UPDATE_SELLER_BRAND_LOGO_REDUX: (state, action) => {
      state.Brand_logo = action.payload;
    },
    UPDATE_SELLER_THUMBNAIL_REDUX: (state, action) => {
      state.thumbnail = action.payload;
    },
    UPDATE_SELLER_MULTIPLE_IMAGES_REDUX: (state, action) => {
      state.Images = action.payload;
    },

    DELETE_SELLER_PRODUCT_REDUX: (state, action) => {
      state.delete = action.payload;
    },
  },
});
export const {
  getAllProdctsRedux,
  GET_DASHBOARD_DETAILS_REDUX,
  AddNewProductRedux,
  GET_SINGLE_PRODUCT_REDUX,
  UPDATE_SELLER_PRODUCTS_REDUX,
  UPDATE_SELLER_BRAND_LOGO_REDUX,
  UPDATE_SELLER_MULTIPLE_IMAGES_REDUX,
  UPDATE_SELLER_THUMBNAIL_REDUX,
  DELETE_SELLER_PRODUCT_REDUX,
} = SellerProductSlice.actions;
export default SellerProductSlice.reducer;
