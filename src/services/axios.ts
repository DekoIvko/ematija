import axios, { AxiosError } from "axios";
import { appConfig } from "../appConfig";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = appConfig.localApiUrl;
axios.defaults.withCredentials = true;

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Methods"] = "POST, PUT, GET";
axios.defaults.headers["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept, Authorization";

// axios.interceptors.request.use((config: any) => {
//   return config;
// });

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log(" error interceptor ", error);
    if (error?.response?.status === 404) {
      window.location.href = "/not-found";
    } else if (
      error?.response?.status === 401 ||
      error?.response?.status === 403
    ) {
      toast.error(`${error?.response.data}`);
      window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }

    // if (error.message === "Network Error" && !error.response) {
    //   toast.error("Network error = make sure API is running!");
    //   return error.response;
    // } else

    // Do whatever you want with the response error here:

    // But, be SURE to return the rejected promise, so the caller still has
    // the option of additional specialized handling at the call-site:
    // return error;
  }
);

export default axios;
