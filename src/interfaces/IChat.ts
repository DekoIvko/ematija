import { IMessages } from "./IMessages";
import { IUser } from "./IUser";

export interface IChat {
  id: number;
  senderIdOne: number;
  senderIdTwo: number;
  senderIdTwoInfo?: IUser;
  messages?: IMessages[];
}
