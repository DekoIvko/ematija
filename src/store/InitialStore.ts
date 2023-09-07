import { EFacebookUser } from "../enums/EFacebookUser";
import { IInitialStore } from "../interfaces/IInitialStore";

const InitialStore: any = { // need to find solution about not any type
    facebookUser: EFacebookUser,
    appTheme: 'dark',
    counter: 0,
}

export default InitialStore;