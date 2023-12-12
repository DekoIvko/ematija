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
    throw error;
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
    throw error;
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
    throw error;
  }
};

export const RegisterUserService = async (user: any) => {
  try {
    const response = await axios.post("/user/register", user, {
      signal: newAbortSignal(2000),
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const LoginUserService = async (user: any) => {
  try {
    const response = await axios.post("/user/login", user, {
      signal: newAbortSignal(2000),
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
