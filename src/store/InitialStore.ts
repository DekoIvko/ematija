import { EFacebookUser } from "../enums/EFacebookUser";
import { ELogedUser } from "../enums/ELogedUser";
// import { IInitialStore } from "../interfaces/IInitialStore";

const InitialStore: any = { // need to find solution about not any type
    facebookUser: EFacebookUser,
    logedUser: ELogedUser,
    appTheme: 'dark',
    counter: 0,
}

export default InitialStore;