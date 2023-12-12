import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/statuses";

export interface IAuthSlice {
  userStatus: string;
  user: any;
  token: any;
  errors: string;
}

const initialState: IAuthSlice = {
  userStatus: STATUS.IDLE.toString(),
  user: {},
  token: "",
  errors: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const userAndToken = JSON.parse(
        window.localStorage.getItem("ematija-user")!
      );
      if (userAndToken) {
        state.user = userAndToken;
        state.token = userAndToken.accessToken;
      } else {
        const { accessToken, email, firstName, image, lastName } =
          action.payload;
        const user = {
          email: email,
          firstName,
          lastName,
          image,
        };

        state.user = user;
        state.token = accessToken;
      }
    },
    logOut: (state, action) => {
      state.user = {};
      state.token = "";
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;

export const authUser = (state: any) => state.auth.user;
export const authToken = (state: any) => state.auth.token;
