import { IFacebookUser } from "./IFacebookUser";
import { ILoggedUser } from "./ILoggedUser";

export interface IInitialStore {
  facebookUser: IFacebookUser;
  loggedUser: ILoggedUser;
  appTheme: string;
  activeNavItem: string;
  counter: number;
  error: boolean;
  errorMessage: string;
  loader: boolean;
}
