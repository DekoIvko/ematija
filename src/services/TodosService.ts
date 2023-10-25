import axios, { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import { IAddTodo } from "../interfaces/ITodos";

export const GetTodosService = async () => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/todos?limit=300`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const GetTodosByUserService = async (userId: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/todos/user/${userId}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
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
        signal: newAbortSignal(2000),
      }
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
