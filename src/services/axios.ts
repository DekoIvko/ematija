import Axios from "axios";
import { appConfig } from "../appConfig";
import { ILoggedUser } from "../interfaces/ILoggedUser";
import { parseJsonString } from "../utils/helpers";

const axios = Axios.create({
  baseURL: appConfig.baseApiURL,
});

axios.interceptors.request.use((config: any) => {
  const user = localStorage.getItem("ematija-user");
  const userObj: ILoggedUser = parseJsonString(user!);

  if (userObj?.token) {
    config.headers.Authorization = `Bearer ${userObj?.token}`;
  }
  return config;
});

axios.interceptors.response.use(
  function (response) {
    // Optional: Do something with response data
    return response;
  },
  function (error) {
    // Do whatever you want with the response error here:
    // console.log("!!!!! ", error.response);
    // But, be SURE to return the rejected promise, so the caller still has
    // the option of additional specialized handling at the call-site:
    return error?.response;
  }
);

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept";
axios.defaults.headers["Access-Control-Allow-Methods"] =
  "POST, PUT, DELETE, GET, OPTIONS";

export default axios;
