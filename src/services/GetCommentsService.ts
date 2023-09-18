import axios from "axios";
import { appConfig } from "../appConfig";

export const GetAllCommentsService = async () => {
  try {
    return await axios.get(`${appConfig.baseApiURL}/comments?limit=300`).then((res) => {
      return res.data.comments;
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
