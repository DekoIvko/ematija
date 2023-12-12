import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS } from "../utils/statuses";

export interface IUserSlice {
  userStatus: string;
  user: any;
  users: any;
  errors: string;
}

const initialState: IUserSlice = {
  userStatus: STATUS.IDLE.toString(),
  user: [],
  users: [],
  errors: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state: IUserSlice, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
