import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";

import axios from "./axios";
import { authHeader } from "./AuthHeader";

export const GetUsersService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/users`,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const GetMessengerUsersService = async (filter: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/users/messenger?filter=${filter}`,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const GetUsersSearchService = async (userSearch: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/users/search?limit=100&q=${userSearch}`,
      {
        signal: newAbortSignal(),
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const RegisterUserService = async (user: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${appConfig.localApiUrl}/user/register`,
      user,
      {
        signal: newAbortSignal(),
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const LoginUserService = async (user: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${appConfig.localApiUrl}/user/login`,
      user,
      {
        signal: newAbortSignal(),
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
