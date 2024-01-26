import { configureStore } from "@reduxjs/toolkit";
import appSettingsSlice from "./appSettingsSlice";
import cartProductsSlice from "./cartProductsSlice";

export const store = configureStore({
  reducer: {
    appSettings: appSettingsSlice,
    cartProducts: cartProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
