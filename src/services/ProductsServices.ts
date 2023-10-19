import { appConfig } from "../appConfig";
import { newAbortSignal } from "../utils/helpers";

import axios from "./axios";

export const GetProductsService = async () => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/products?limit=100`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
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
    return error;
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
    return error;
  }
};

export const GetProductsByCategoryService = async (category: string) => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/products/categories/${category}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
