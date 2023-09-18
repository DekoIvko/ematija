import Axios from "axios";
import { appConfig } from "../appConfig";
import { ILogedUser } from "../interfaces/ILogedUser";

const axios = Axios.create({
  baseURL: appConfig.baseApiURL,
});

axios.interceptors.request.use((config: any) => {
  const user = localStorage.getItem("ematija-user");
  const userObj:ILogedUser = JSON.parse(user!)

  if (userObj?.token) {
    config.headers.Authorization = `Bearer ${userObj?.token}`;
  }
  return config;
});

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept";
axios.defaults.headers["Access-Control-Allow-Methods"] =
  "POST, PUT, DELETE, GET, OPTIONS";

export default axios;
