export interface IUser {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  contact: IContact;
  birthDate: string;
  gender: string;
  image: string;
}

interface IContact {
  address: string;
  city: string;
  state: string;
  phone: string;
}
