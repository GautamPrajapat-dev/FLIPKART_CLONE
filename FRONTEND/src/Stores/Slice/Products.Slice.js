import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: {
    AllProducts: [],
  },
  reducers: {
    All_PRODUCT_SAGA: () => {},
    All_PRODUCT: (state, action) => {
      state.AllProducts = action.payload;
    },
  },
});
export const { AllProductRedux } = ProductSlice.actions;
export default ProductSlice.reducer;
