export interface IUserDetails {
  id: number;
  userAgent: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  address: IAddress;
  age: number;
  bank: IBank;
  birthDate: string;
  bloodGroup: string;
  company: ICompany;
  domain: string;
  ein: string;
  email: string;
  eyeColor: string;
  gender: string;
  image: string;
  ip: string;
  macAddress: string;
  phone: string;
  ssn: string;
  hair?: IHair;
  maidenName?: string;
  university?: string;
  height?: number;
  weight?: number;
}

interface IHair {
  color: string;
  type: string;
}

interface ICompany {
  address: IAddress;
  department: string;
  name: string;
  title: string;
}

interface IBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface IAddress {
  address: string;
  city: string;
  coordinates: any;
  postalCode: string;
  state: string;
}
