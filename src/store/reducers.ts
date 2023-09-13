import { IFacebookUser } from "../interfaces/IFacebookUser";
// import { IInitialStore } from "../interfaces/IInitialStore";

interface IActions {
  type: "setFacebookUser" | "setAppTheme" | "setCounter" | "setLogedUser";
  payload: IFacebookUser | string;
}

export let reducer = (state: any, action: IActions) => {
  // console.log(state, action)
  switch (action.type) {
    case "setFacebookUser":
      return { ...state, facebookUser: action.payload };
    case "setLogedUser":
      return { ...state, logedUser: action.payload };
    case "setAppTheme":
      return { ...state, appTheme: action.payload };
    case "setCounter":
      return { ...state, counter: action.payload };
    default:
      return;
  }
};
