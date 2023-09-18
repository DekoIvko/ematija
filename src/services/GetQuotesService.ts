import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import axios from "./axios";

export const GetQuotesService = async () => {
  try {
    return await axios
      .get(`${appConfig.baseApiURL}/quotes?limit=100`, {
        signal: newAbortSignal(2000),
      })
      .then((res) => {
        return res?.data?.quotes;
      });
  } catch (error: any) {
    throw Error(error);
  }
};
