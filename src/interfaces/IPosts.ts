import { IComments } from "./IComments";
import { IUserDetails } from "./IUserDetails";

export interface IPosts {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: Array<string>;
  reactions: number;
  user: IUserDetails;
  comments: IComments[];
  showCommentSection: boolean;
}
