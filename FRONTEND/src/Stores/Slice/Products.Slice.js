import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: {
    AllProduct: [],
  },
  reducers: {
    AllProductRedux: (state, action) => {
      state.AllProduct = action.payload;
    },
  },
});
export const { AllProductRedux } = ProductSlice.actions;
export default ProductSlice.reducer;
