import { appConfig } from "../appConfig";
import { IProducts } from "../interfaces/IProducts";
import { newAbortSignal } from "../utils/helpers";
import { authHeader } from "./AuthHeader";

import axios from "./axios";

export const GetProductsService = async () => {
  try {
    const response = await axios.get(`${appConfig.localApiUrl}/products`, {
      headers: authHeader(),
      signal: newAbortSignal(2000),
    });
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetProductService = async (idProduct: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/products/${idProduct}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetProductCategoriesService = async () => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/products/categories`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetProductsByCategoryService = async (category: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/products/category/${category}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetProductsBySearchService = async (search: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/products/search?q=${search}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const AddNewProductsService = async (products: IProducts) => {
  try {
    const response = await axios.post(
      `${appConfig.localApiUrl}/products/add`,
      { products },
      {
        headers: authHeader(),
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
