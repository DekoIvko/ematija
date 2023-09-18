export interface IComments {
  body: string;
  id: number;
  postId: number;
  user: User;
}

interface User {
  id: number;
  username: string;
}
