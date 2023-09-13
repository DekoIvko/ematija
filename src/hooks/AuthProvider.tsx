import React, { useEffect, useState } from "react";
import { createContext } from "vm";
import AuthService from "../services/AuthService";

type InititalContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }: InititalContextProviderProps) => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    async function funfunfunction() {
      const authData = await AuthService({
        username: "kminchelle",
        password: "0lelplR",
      });
      console.log(authData);
      setIsAuth(authData);
    }

    funfunfunction();
  }, []);

  return <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>;
};
