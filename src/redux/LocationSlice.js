import { createSlice } from "@reduxjs/toolkit";

export const userLocationSlice = createSlice({
  name: "userLocation",
  initialState: null,
  reducers: {
    setUserLocation: (state, action) => action.payload,
  },
});

export const { setUserLocation } = userLocationSlice.actions;

export default userLocationSlice.reducer;
