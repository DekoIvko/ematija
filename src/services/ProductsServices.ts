import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";

import axios from "./axios";

export const GetProductsService = async () => {
  try {
    return await axios.get(`${appConfig.baseApiURL}/products`, {
      signal: newAbortSignal(2000),
    });
  } catch (error: any) {
    return error;
  }
};
