"use client";

import { configureStore } from "@reduxjs/toolkit";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import mainReducer from "./slices/mainSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import commissionsReducer from "./slices/commissionsSlice";
import googleTwoFAReducer from "./slices/googleTwoFASlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      main: mainReducer,
      user: userReducer,
      category: categoryReducer,
      commissions: commissionsReducer,
      googleTwoFA: googleTwoFAReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
