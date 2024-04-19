"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectedBusinessReducer from "./BusinessSlice";
import userLocationReducer from "./LocationSlice";

export default configureStore({
  reducer: {
    selectedBusiness: selectedBusinessReducer,
    userLocation: userLocationReducer,
  },
});
