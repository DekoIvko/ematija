import { IComments } from "./IComments";
import { IReactions } from "./IReactions";
import { IUserDetails } from "./IUserDetails";

export interface IPosts {
  _id?: string;
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: Array<string>;
  reactions: Array<IReactions>;
  comments: IComments[];
  showCommentSection: boolean;
  user?: IUserDetails;
}
