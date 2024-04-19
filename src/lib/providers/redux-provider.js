"use client";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";

const ReduxWrapper = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default ReduxWrapper;
