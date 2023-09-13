import { appConfig } from "../appConfig";
import axios from "./axios";

const AuthService = async (user: any) => {
  try {
    return await axios
      .post(`${appConfig.baseApiURL}/auth/login`,  user )
      .then((res) => {
        return res.data;
      });
  } catch (error: any) {
    throw Error(error);
  }
};

export default AuthService;
