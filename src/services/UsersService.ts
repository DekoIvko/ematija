import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";

import axios from "./axios";
import { authHeader } from "./AuthHeader";

export const GetUsersService = async () => {
  try {
    const response = await axios.get(`${appConfig.localApiUrl}/users`, {
      headers: authHeader(),
      signal: newAbortSignal(2000),
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const GetMessengerUsersService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/users`,
      {
        headers: authHeader(),
        signal: newAbortSignal(2000),
      }
    );
    return response;
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
    const response: AxiosResponse = await axios.post(
      `${appConfig.localApiUrl}/user/register`,
      user,
      {
        signal: newAbortSignal(2000),
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
        signal: newAbortSignal(2000),
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
