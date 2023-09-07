import { appConfig } from "../appConfig";
import axios from "./axios";

const GetPostsService = async () => {
  try {
    return await axios.get(`${appConfig.baseApiURL}/post`).then((res) => {
      return res.data;
    });
  } catch (error: any) {
    throw Error(error);
  }
};

export default GetPostsService;
