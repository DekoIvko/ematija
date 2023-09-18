import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import axios from "./axios";

export const GetPostsService = async () => {
  try {
    return await axios
      .get(`${appConfig.baseApiURL}/post?limit=100`,{
        signal: newAbortSignal(2000),
      })
      .then((res) => {
        return res?.data?.posts;
      });
  } catch (error: any) {
    throw Error(error);
  }
};

export const GetUserPostsService = async (userId: string) => {
  try {
    if (userId) {
      return await axios
        .get(`${appConfig.baseApiURL}/post/user/${userId}`,{
          signal: newAbortSignal(2000),
        })
        .then((res) => {
          return res?.data?.posts;
        });
    }
  } catch (error: any) {
    throw Error(error);
  }
};
