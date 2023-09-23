import axios, { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import { IParamComment } from "../interfaces/IParamComment";

export const GetAllCommentsService = async () => {
  try {
    return await axios.get(`${appConfig.baseApiURL}/comments?limit=300`, {
      signal: newAbortSignal(2000),
    });
  } catch (error: any) {
    return error;
  }
};
export const AddCommentService = async (comment: IParamComment) => {
  try {
    return await axios.post(`${appConfig.baseApiURL}/comments/add`, comment, {
      signal: newAbortSignal(2000),
    });
  } catch (error: any) {
    return error;
  }
};
