import { createSlice } from "@reduxjs/toolkit";

export const selectedBusinessSlice = createSlice({
  name: "selectedBusiness",
  initialState: null,
  reducers: {
    setSelectedBusiness: (state, action) => action.payload,
  },
});

export const { setSelectedBusiness } = selectedBusinessSlice.actions;

export default selectedBusinessSlice.reducer;
