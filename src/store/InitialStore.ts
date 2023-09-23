import { EFacebookUser } from "../enums/EFacebookUser";
import { ELoggedUser } from "../enums/ELoggedUser";
// import { IInitialStore } from "../interfaces/IInitialStore";

const InitialStore: any = {
  // need to find solution about not any type
  facebookUser: EFacebookUser,
  loggedUser: ELoggedUser,
  appTheme: "dark",
  activeNavItem: "feed",
  counter: 0,
  error: false,
  errorMessage: "",
  loader: false,
};

export default InitialStore;
