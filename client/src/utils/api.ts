import axios, { AxiosInstance } from "axios";

export const thirdPartyAPI: AxiosInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

const isProduction = process.env.NODE_ENV === "production";

export const restfulAPI: AxiosInstance = axios.create({
  baseURL: isProduction ? "api/" : "http://localhost:5010/api/",
});
