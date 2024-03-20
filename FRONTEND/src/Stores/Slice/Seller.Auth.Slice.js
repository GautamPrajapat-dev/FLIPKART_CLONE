import { createSlice } from "@reduxjs/toolkit";
import { getSeller } from "../Saga/Services/Seller.Services";

const id = await getSeller();

const SellerAuthSlice = createSlice({
  name: "SellerAuthSlice",
  initialState: {
    isAuthantiCate: id,
    logoutSeller: true,
  },
  reducers: {
    AllProductRedux: (state, action) => {
      state.AllProduct = action.payload;
    },
  },
});
export const { AllProductRedux } = SellerAuthSlice.actions;
export default SellerAuthSlice.reducer;
