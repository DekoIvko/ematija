import { appConfig } from "../appConfig";
import axios from "./axios";

export const GetQuotesService = async () => {
  try {
    return await axios.get(`${appConfig.baseApiURL}/quotes?limit=100`).then((res) => {
      return res?.data?.quotes;
    });
  } catch (error: any) {
    throw Error(error);
  }
};