import { IUserDetails } from "./IUserDetails";

export interface ITodos {
  completed: boolean;
  id: number;
  todo: string;
  userId: number;
  user: IUserDetails
}
