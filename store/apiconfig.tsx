import axios from "axios";
import { BASE_URL } from "./API";
import { tokenStorage } from "./Storage";

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async (config) => {
  const app_access_token = tokenStorage.getString("app_access_token");
  console.log("access token ", app_access_token);

  if (app_access_token) {
    console.log("Api call");
    config.headers.Authorization = `Bearer ${app_access_token}`;
  }
  return config;
});
