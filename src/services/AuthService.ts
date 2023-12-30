import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import axios from "./axios";

export const AuthAccessService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/auth/access`
    );

    if (response?.status === 200) {
      return response?.data;
    } else {
      return response;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const AuthRefreshService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/auth/refresh`
    );

    if (response?.status === 200) {
      return response?.data;
    } else {
      return response;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};
