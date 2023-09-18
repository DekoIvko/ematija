export interface IPosts {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: Array<string>;
  reactions: number;
  user: any;
  comments: any;
}
