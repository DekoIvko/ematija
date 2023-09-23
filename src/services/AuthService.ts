import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import axios from "./axios";

const AuthService = async (user: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${appConfig.baseApiURL}/auth/login`,
      user
    );

    if (response?.status === 200) {
      return response?.data;
    } else {
      return response;
    }
  } catch (error: any) {
    throw Error(error);
  }
};

export default AuthService;
