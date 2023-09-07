import { IFacebookUser } from "./IFacebookUser";

export interface IInitialStore {
    facebookUser: IFacebookUser;
    appTheme: string;
    counter: number;
}