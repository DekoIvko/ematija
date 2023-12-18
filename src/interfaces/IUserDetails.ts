export interface IUserDetails {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  contact: IContact;
  birthDate: string;
  email: string;
  gender: string;
  image: string;
}

interface IContact {
  address: string;
  city: string;
  state: string;
  phone: String;
}
