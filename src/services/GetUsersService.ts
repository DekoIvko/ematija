import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";

import axios from "./axios";

export const GetUsersService = async () => {
  try {
    return await axios
      .get(`${appConfig.baseApiURL}/users?limit=100`, {
        signal: newAbortSignal(2000),
      })
      .then((res) => {
        return res?.data?.users;
      });
  } catch (error: any) {
    throw Error(error);
  }
};

export const GetSingleUserService = async (userId: string) => {
  try {
    if (userId) {
      return await axios
        .get(`${appConfig.baseApiURL}/users/${userId}`, {
          signal: newAbortSignal(2000),
        })
        .then((res) => {
          return res?.data;
        });
    }
  } catch (error: any) {
    throw Error(error);
  }
};
