import Axios from "axios";
import { appConfig } from "../appConfig";

const axios = Axios.create({
  baseURL: appConfig.baseApiURL,
});

axios.interceptors.request.use((config: any) => {
  const user = localStorage.getItem("ematija-user");
  if (user) {
    config.headers.Authorization = `Bearer ${user}`;
  }
  return config;
});

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept";
axios.defaults.headers.post["Access-Control-Allow-Methods"] =
  "POST, PUT, DELETE, GET, OPTIONS";

export default axios;
