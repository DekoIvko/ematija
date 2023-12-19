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
        withCredentials: true,
        headers: authHeader(),
        signal: newAbortSignal(2000),
      }
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
export const AddCommentService = async (comment: IParamComment) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${appConfig.localApiUrl}/comments/add`,
      comment,
      {
        headers: authHeader(),
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
