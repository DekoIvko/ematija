import { IUserDetails } from "./IUserDetails";

export interface ITodos {
  completed: boolean;
  id: number;
  todo: string;
  userId: number;
  user: IUserDetails;
}

export interface IAddTodo {
  todo: string;
  completed: boolean;
  userId: number;
}
