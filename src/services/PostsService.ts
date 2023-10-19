import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import axios from "./axios";

export const GetPostsService = async () => {
  try {
    const response = await axios.get(`${appConfig.baseApiURL}/post?limit=100`, {
      signal: newAbortSignal(2000),
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const GetUserPostsService = async (userId: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/post/user/${userId}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const UpdatePostsService = async (postId: string) => {
  try {
    const response = await axios.put(
      `${appConfig.baseApiURL}/posts/${postId}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const ShowCommentSectionService = async (updatedPosts: any) => {
  try {
    return updatedPosts;
  } catch (error: any) {
    return error;
  }
};
