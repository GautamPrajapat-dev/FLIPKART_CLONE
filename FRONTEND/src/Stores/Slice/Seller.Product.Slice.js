import { createSlice } from "@reduxjs/toolkit";

const SellerProductSlice = createSlice({
  name: "SELLER_PRODUCT",
  initialState: {
    products: [],
    product: {},
    updateProducts: {},
    Brand_logo: {},
    thumbnail: {},
    Images: {},
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
    UPDATE_SELLER_PRODUCTS_SAGA: (state, action) => {},
    UPDATE_SELLER_PRODUCTS_REDUX: (state, action) => {
      state.updateProducts = action.payload;
    },
    UPDATE_SELLER_BRAND_LOGO_SAGA: (state, action) => {},
    UPDATE_SELLER_BRAND_LOGO_REDUX: (state, action) => {
      state.Brand_logo = action.payload;
    },
    UPDATE_SELLER_THUMBNAIL_SAGA: (state, action) => {},
    UPDATE_SELLER_THUMBNAIL_REDUX: (state, action) => {
      state.thumbnail = action.payload;
    },
    UPDATE_SELLER_MULTIPLE_IMAGES_SAGA: (state, action) => {},
    UPDATE_SELLER_MULTIPLE_IMAGES_REDUX: (state, action) => {
      state.Images = action.payload;
    },
  },
});
export const {
  getAllProdctsRedux,
  GET_ALL_PRODUCTS_SAGA,
  AddNewProductRedux,
  AddNewProductSellerSaga,
  GET_SINGLE_PRODUCT_REDUX,
  UPDATE_SELLER_PRODUCTS_REDUX,
  GET_SINGLE_PRODUCT_SAGA,
  UPDATE_SELLER_PRODUCTS_SAGA,
  UPDATE_SELLER_BRAND_LOGO_REDUX,
  UPDATE_SELLER_BRAND_LOGO_SAGA,
  UPDATE_SELLER_MULTIPLE_IMAGES_REDUX,
  UPDATE_SELLER_MULTIPLE_IMAGES_SAGA,
  UPDATE_SELLER_THUMBNAIL_REDUX,
  UPDATE_SELLER_THUMBNAIL_SAGA,
} = SellerProductSlice.actions;
export default SellerProductSlice.reducer;
