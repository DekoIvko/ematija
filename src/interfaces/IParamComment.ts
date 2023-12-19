export interface IParamComment {
  id?: number;
  body: string;
  postId: number;
  tags: [];
  reactions: [];
  user: {
    id: number;
    username: string;
  };
}
