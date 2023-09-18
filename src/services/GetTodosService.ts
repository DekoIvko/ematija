import axios from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";

export const GetTodosService = async () => {
  try {
    return await axios
      .get(`${appConfig.baseApiURL}/todos?limit=300`, {
        signal: newAbortSignal(2000),
      })
      .then((res) => {
        return res?.data?.todos;
      });
  } catch (error: any) {
    throw new Error(error);
  }
};
