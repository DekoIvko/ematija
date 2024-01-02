import axios, { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import { IAddTodo } from "../interfaces/ITodos";
import { authHeader } from "./AuthHeader";

export const GetTodosService = async () => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/todos?limit=300`,
      {
        // headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

export const GetTodosByUserService = async (userId: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/todos/user/${userId}`,
      {
        // headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

export const CreateTodosService = async (todo: IAddTodo) => {
  try {
    const response = await axios.post(
      `${appConfig.baseApiURL}/todos/add`,
      todo,
      {
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
