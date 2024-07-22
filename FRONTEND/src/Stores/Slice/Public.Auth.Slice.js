import { createSlice } from "@reduxjs/toolkit";

const PublicAuthSlice = createSlice({
  name: "PublicAuthSlice",
  initialState: {
    profile: [],
    avatar: {},
  },
  reducers: {
    PUBLIC_PROFILE_SAGA: (state, action) => {},
    PUBLIC_PROFILE_REDUX: (state, action) => {
      state.profile = action.payload;
    },
  },
});
export const { PUBLIC_PROFILE_REDUX, PUBLIC_PROFILE_SAGA } =
  PublicAuthSlice.actions;
export default PublicAuthSlice.reducer;
