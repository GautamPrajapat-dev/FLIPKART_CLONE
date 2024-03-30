import { createSlice } from "@reduxjs/toolkit";

const SellerAuthSlice = createSlice({
  name: "SellerAuthSlice",
  initialState: {
    profile: [],
    avatar: {},
  },
  reducers: {
    SELLER_PROFILE_SAGA: (state, action) => {},
    SELLER_PRODFILE_REDUX: (state, action) => {
      state.profile = action.payload;
    },
    UPDATE_PROFILE_SAGA: (state, action) => {},
    UPDATE_PROFILE_REDUX: (state, action) => {
      state.avatar = action.payload;
    },
  },
});
export const {
  SELLER_PRODFILE_REDUX,
  SELLER_PROFILE_SAGA,
  UPDATE_PROFILE_REDUX,
  UPDATE_PROFILE_SAGA,
} = SellerAuthSlice.actions;
export default SellerAuthSlice.reducer;
