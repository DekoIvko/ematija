import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import axios from "./axios";
import { authHeader } from "./AuthHeader";

export const GetPostsService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/posts`,
      {
        withCredentials: true,
        headers: authHeader(),
        signal: newAbortSignal(2000),
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetUserPostsService = async (userId: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/posts?id=${userId}`,
      {
        headers: authHeader(),
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
    const response: AxiosResponse = await axios.put(
      `${appConfig.baseApiURL}/posts/${postId}`,
      {
        headers: authHeader(),
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
