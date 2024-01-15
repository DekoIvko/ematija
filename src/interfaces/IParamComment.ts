export interface IParamComment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}
