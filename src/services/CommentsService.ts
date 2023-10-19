import axios, { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import { IParamComment } from "../interfaces/IParamComment";

export const GetAllCommentsService = async () => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/comments?limit=300`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const AddCommentService = async (comment: IParamComment) => {
  try {
    const response = await axios.post(
      `${appConfig.baseApiURL}/comments/add`,
      comment,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
