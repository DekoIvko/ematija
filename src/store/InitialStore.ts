import { EFacebookUser } from "../enums/EFacebookUser";
import { ELogedUser } from "../enums/ELogedUser";
// import { IInitialStore } from "../interfaces/IInitialStore";

const InitialStore: any = { // need to find solution about not any type
    facebookUser: EFacebookUser,
    logedUser: ELogedUser,
    appTheme: 'dark',
    activeNavItem: 'feed',
    counter: 0,
    error: false,
    errorMessage: '',
    loader: false,
}

export default InitialStore;