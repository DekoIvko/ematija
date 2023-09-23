import { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IStateContext, StateContext } from "../store/store";
import { parseJsonString } from "../utils/helpers";
import LogInPage from "../pages/Features/LogInPage/LogInPage";

interface IProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const navigation = useNavigate();
  const { dispatch } = useContext<IStateContext>(StateContext);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = localStorage.getItem("ematija-user");
    if (!checkUser) {
      setIsLoggedIn(false);
      navigation("login");
    } else {
      setIsLoggedIn(true);
      const parserUser = parseJsonString(checkUser);
      dispatch({ type: "setLoggedUser", payload: parserUser });
    }
  }, []);

  return <>{isLoggedIn ? children : <LogInPage />}</>;
};

export default AuthProvider;
