import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import axios from "./axios";
import { authHeader } from "./AuthHeader";

export const GetQuotesService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/quotes`,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};
