import axios, { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import { IParamComment } from "../interfaces/IParamComment";
import { authHeader } from "./AuthHeader";

export const GetAllCommentsService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/comments`,
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
export const AddCommentService = async (comment: IParamComment) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${appConfig.localApiUrl}/comments/add`,
      comment,
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
