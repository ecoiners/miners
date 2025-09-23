import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["task", "user"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://servers-ngo2.vercel.app/api/v1",
    prepareHeaders(headers) {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("authorization", `${token}`);
      }
    },
  }),
  endpoints: () => ({}),

});

export default baseApi;
