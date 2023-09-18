import { IFacebookUser } from "./IFacebookUser";
import { ILogedUser } from "./ILogedUser";

export interface IInitialStore {
    facebookUser: IFacebookUser;
    logedUser: ILogedUser,
    appTheme: string;
    activeNavItem: string;
    counter: number;
    error: boolean,
    errorMessage: string,
    loader: boolean,
}