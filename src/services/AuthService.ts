import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import axios from "./axios";

export const AuthAccessService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/auth/access`,
      {
        withCredentials: true,
      }
    );

    if (response?.status === 200) {
      return response?.data;
    } else {
      return response;
    }
  } catch (error: any) {
    throw Error(error);
  }
};

export const AuthRefreshService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/auth/refresh`,
      { withCredentials: true }
    );

    if (response?.status === 200) {
      return response?.data;
    } else {
      return response;
    }
  } catch (error: any) {
    throw Error(error);
  }
};
