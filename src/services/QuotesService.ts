import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import axios from "./axios";

export const GetQuotesService = async () => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/quotes?limit=100`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
