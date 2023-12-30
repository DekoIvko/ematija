import { IComments } from "./IComments";
import { IUserDetails } from "./IUserDetails";

export interface IPosts {
  _id?: string;
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: Array<string>;
  reactions: Array<string>;
  comments: IComments[];
  showCommentSection: boolean;
  user?: IUserDetails;
}
