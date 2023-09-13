import { appConfig } from "../appConfig";
import axios from "./axios";

const GetUsersService = async () => {
  try {
    return await axios.get(`${appConfig.baseApiURL}/users`).then((res) => {
      return res.data;
    });
  } catch (error: any) {
    throw Error(error);
  }
};

export default GetUsersService;