import axios from "axios";
import { appConfig } from "../appConfig";
import { toast } from "react-hot-toast";
// import useRefreshToken from "../hooks/useRefreshToken";

axios.defaults.baseURL = appConfig.localApiUrl;

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Methods"] = "POST, PUT, GET";
axios.defaults.headers["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept, Authorization";
// axios.defaults.withCredentials = true;

// axios.interceptors.request.use((config: any) => {
//   return config;
// });

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error" && !error.response) {
      toast.error("Network error = make sure API is running!");
    }
    if (axios.isCancel(error)) {
      throw new Error(`Is canceled ${error}`);
    }
    if (error?.response?.status === 404) {
      throw new Error(`PAGE NOT FOUND ${error?.request?.responseURL}`);
    }
    if (error?.response?.status === 401) {
      throw new Error(`Unauthorized 401 ${error}`);
    }
    if (error?.response?.status === 403) {
      throw new Error(`Forbidden: 403 ${error}`);
    }
    if (error?.response?.status === 500) {
      return error?.response;
    }
    // Do whatever you want with the response error here:

    // But, be SURE to return the rejected promise, so the caller still has
    // the option of additional specialized handling at the call-site:
    return error?.response;
  }
);

export default axios;
