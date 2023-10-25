import { appConfig } from "../appConfig";
import { IProducts } from "../interfaces/IProducts";
import { newAbortSignal } from "../utils/helpers";

import axios from "./axios";

export const GetProductsService = async () => {
  try {
    const response = await axios.get(
      `${appConfig.baseApiURL}/products?limit=95`,
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
      `${appConfig.baseApiURL}/products/category/${category}`,
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
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
    return error;
  }
};

export const AddNewProductsService = async (products: IProducts) => {
  try {
    const response = await axios.post(
      `${appConfig.baseApiURL}/products/add`,
      { products },
      {
        signal: newAbortSignal(2000),
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
