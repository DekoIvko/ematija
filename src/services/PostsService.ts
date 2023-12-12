import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import axios from "./axios";
import { authHeader } from "./AuthHeader";

export const GetPostsService = async () => {
  try {
    const response = await axios.get(`${appConfig.localApiUrl}/posts`, {
      headers: authHeader(),
      signal: newAbortSignal(2000),
    });
    return response;
  } catch (error: any) {
    throw new Error(error);
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
    return response;
  } catch (error: any) {
    throw new Error(error);
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
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ShowCommentSectionService = async (updatedPosts: any) => {
  try {
    return updatedPosts;
  } catch (error: any) {
    throw new Error(error);
  }
};
