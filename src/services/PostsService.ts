import { AxiosResponse } from "axios";
import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";
import axios from "./axios";
import { authHeader } from "./AuthHeader";
import { IPosts } from "../interfaces/IPosts";

export const GetPostsService = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/posts`,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const GetUserPostsService = async (userId: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/posts?id=${userId}`,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const AddPostService = async (post: IPosts) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${appConfig.localApiUrl}/posts/add`,
      post,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const UpdatePostsService = async (postId: string) => {
  try {
    const response: AxiosResponse = await axios.put(
      `${appConfig.baseApiURL}/posts/${postId}`,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const RemovePostService = async (postId: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${appConfig.localApiUrl}/posts/remove?postId=${postId}`,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const AddReactionsService = async (params: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${appConfig.localApiUrl}/posts/add-reaction`,
      params,
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const ShowCommentSectionService = async (updatedPosts: any) => {
  try {
    return updatedPosts;
  } catch (error: any) {
    throw new Error(error);
  }
};
