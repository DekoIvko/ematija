import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";

import axios from "./axios";

export const GetUsersService = async () => {
  try {
    return await axios.get(`${appConfig.baseApiURL}/users?limit=100`, {
      signal: newAbortSignal(2000),
    });
  } catch (error: any) {
    return error;
  }
};

export const GetSingleUserService = async (userId: string) => {
  try {
    return await axios.get(`${appConfig.baseApiURL}/users/${userId}`, {
      signal: newAbortSignal(2000),
    });
  } catch (error: any) {
    return error;
  }
};