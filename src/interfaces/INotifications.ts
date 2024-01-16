export interface INotifications {
  id: number;
  type: string;
  fromUserId: number;
  toUserId: number;
  timestamp: string;
  title: string;
  body: string;
  fullName: string;
}
