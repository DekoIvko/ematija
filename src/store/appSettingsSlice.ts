import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  appTheme: string;
}

const initialState: IInitialState = {
  appTheme: "dark",
};

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    changeAppTheme: (state: IInitialState, action: PayloadAction<any>) => {
      console.log(action);
      const tempState = state;
      tempState.appTheme = action.payload;

      state = tempState;
    },
  },
});

export const { changeAppTheme } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
