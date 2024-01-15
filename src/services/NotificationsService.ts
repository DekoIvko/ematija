import axios, { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import { authHeader } from "./AuthHeader";
import { INotifications } from "../interfaces/INotifications";

export const GetAllNotificationsService = async (userId: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/notifications?userId=${userId}`,
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

export const AddNotificationService = async (notification: INotifications) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${appConfig.localApiUrl}/notifications/add`,
      notification,
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
