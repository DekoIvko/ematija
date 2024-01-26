import { appConfig } from "../appConfig";
import { IProducts } from "../interfaces/IProducts";
import { newAbortSignal } from "../utils/helpers";
import { authHeader } from "./AuthHeader";

import axios from "./axios";

export const GetProductsService = async () => {
  try {
    const response = await axios.get(`${appConfig.localApiUrl}/products`, {
      headers: authHeader(),
      signal: newAbortSignal(),
    });
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const GetProductService = async (idProduct: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/products/${idProduct}`,
      {
        withCredentials: false,
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

export const GetProductCategoriesService = async () => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/products/categories`,
      {
        withCredentials: false,
        signal: newAbortSignal(),
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const GetProductsFiltersService = async (params: {
  category: string;
  search: string;
}) => {
  try {
    const { category, search } = params;
    const response = await axios.get(
      `${appConfig.localApiUrl}/products/search?category=${category}&search=${search}`,
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

export const AddNewProductsService = async (products: IProducts) => {
  try {
    const response = await axios.post(
      `${appConfig.localApiUrl}/products/add`,
      { products },
      {
        headers: authHeader(),
        signal: newAbortSignal(),
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      Promise.reject(error);
    } else {
      throw new Error(`${error}`);
    }
  }
};
