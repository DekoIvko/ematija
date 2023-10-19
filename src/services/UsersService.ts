import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";

import axios from "./axios";

export const GetUsersService = async () => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/users?limit=100`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const GetSingleUserService = async (userId: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/users/${userId}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const GetUsersSearchService = async (userSearch: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/users/search?limit=100&q=${userSearch}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
