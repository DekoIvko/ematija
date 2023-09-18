import axios from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";

export const GetAllCommentsService = async () => {
  try {
    return await axios
      .get(`${appConfig.baseApiURL}/comments?limit=300`, {
        signal: newAbortSignal(2000),
      })
      .then((res) => {
        return res?.data?.comments;
      });
  } catch (error: any) {
    throw new Error(error);
  }
};
