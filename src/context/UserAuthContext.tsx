import { ReactNode, createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../interfaces/IUser";

interface Props {
  children: ReactNode;
}

interface AppContextProps {
  user: IUser;
  setUser: Function;
  isTokenValid: Function;
}

const defaultProps: AppContextProps = {
  user: {} as IUser,
  setUser: Function,
  isTokenValid: Function,
};

export const AuthContext = createContext<AppContextProps>(defaultProps);

export const useUserAuthContext = () => useContext(AuthContext);

// in case user refresh
// get user from local storage
const userLocalStorage = JSON.parse(
  window.localStorage.getItem("ematija-user")!
);

export const AuthUserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(userLocalStorage || null);

  const isTokenValid = () => {
    if (!user?.accessToken) return false;
    const decoded = jwtDecode(user?.accessToken);
    if (Date.now() > decoded?.exp! * 1000) {
      return false;
    }
    return true;
  };

  const value: any = {
    user,
    setUser,
    isTokenValid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
