import { configureStore } from "@reduxjs/toolkit";
import appSettingsSlice from "./appSettingsSlice";

export const store = configureStore({
  reducer: {
    appSettings: appSettingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
