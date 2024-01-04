import axios, { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import { IAddTodo } from "../interfaces/ITodos";
import { authHeader } from "./AuthHeader";

export const GetTodosService = async (userId?: string) => {
  try {
    const response = await axios.get(
      `${appConfig.localApiUrl}/todos?userId=${userId || ""}`,
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

export const CreateTodosService = async (todo: IAddTodo) => {
  try {
    const response = await axios.post(
      `${appConfig.localApiUrl}/todos/add`,
      todo,
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
