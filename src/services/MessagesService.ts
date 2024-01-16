import axios, { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import { IParamMessage } from "../interfaces/IParamMessage";
import { authHeader } from "./AuthHeader";

export const GetAllMessagesService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/messages`,
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

export const AddMessageService = async (message: IParamMessage) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${appConfig.localApiUrl}/messages/add`,
      message,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};
