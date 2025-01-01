import { createSlice } from "@reduxjs/toolkit";
import { SellerAuthActionSuccess } from "../Actions/SellerAuthAction";
SellerAuthActionSuccess;
const SellerAuthSlice = createSlice({
  name: "sellerAuth",
  initialState: {
    profile: {
      isLoading: false,
      data: [],
    },
    avatar: {},
    details: {},
  },
  reducers: {
    SELLER_PROFILE_SAGA_REQUEST: (state) => {
      state.profile.isLoading = true;
    },
    SELLER_PROFILE_REDUX: (state, action) => {
      state.profile.isLoading = false;
      state.profile.data = action.payload;
    },

    // SELLER_FORGET_PASSWORD_REDUX: (state, action) => {},
    UPDATE_PROFILE_REDUX: (state, action) => {
      state.avatar = action.payload;
    },

    GET_SINGLE_DETAILS_REDUX: (state, action) => {
      state.avatar = action.payload;
    },
    UPDATE_SELLER_DETAILS_REDUX: (state, action) => {
      state.details = action.payload;
    },
  },
});
export const {
  SELLER_PROFILE_REDUX,

  UPDATE_PROFILE_REDUX,
  GET_SINGLE_DETAILS_REDUX,
  UPDATE_SELLER_DETAILS_REDUX,
} = SellerAuthSlice.actions;
export default SellerAuthSlice.reducer;
