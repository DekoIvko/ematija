import { IInitialStore } from "../interfaces/IInitialStore";

export interface IActions {
  type:
    | "setFacebookUser"
    | "setAppTheme"
    | "setCounter"
    | "setLoggedUser"
    | "setLoader"
    // | "setErrorMessage"
    // | "setError"
    | "setNavItem";
  payload: any;
}

export let reducer = (state: IInitialStore, action: IActions) => {
  // console.log(state, action)
  switch (action.type) {
    case "setFacebookUser":
      return { ...state, facebookUser: action.payload };
    case "setLoggedUser":
      return { ...state, loggedUser: action.payload };
    case "setAppTheme":
      return { ...state, appTheme: action.payload };
    case "setNavItem":
      return { ...state, activeNavItem: action.payload };
    case "setLoader":
      return { ...state, loader: action.payload };
    // case "setErrorMessage":
    //   return { ...state, errorMessage: action.payload };
    // case "setError":
    //   return { ...state, error: action.payload };
    case "setCounter":
      return { ...state, counter: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
