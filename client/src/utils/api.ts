import axios, { AxiosInstance } from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchCountries } from "src/redux/slicers/toVisit";

export const thirdPartyAPI: AxiosInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

const isProduction = process.env.NODE_ENV === "production";

export const restfulAPI: AxiosInstance = axios.create({
  baseURL: isProduction ? "api/" : "http://localhost:5010/api/",
});

export const restcountriesAPI = createApi({
  reducerPath: "restcountriesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (builder) => ({
    getByRegion: builder.query({
      query: (region) => `region/${region}`,
      async onQueryStarted(region, { dispatch }) {
        dispatch(fetchCountries("africa"));
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetByRegionQuery } = restcountriesAPI;
