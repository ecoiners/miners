import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BaseQuery = createApi({
    reducerPath: "API",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1",
        // baseUrl: "https://hyperbull-api.syntax-siam.xyz/api/v1",
        // baseUrl: "https://hyper-bull-server.vercel.app/api/v1",
    }),
    endpoints: () => ({})
});

export default BaseQuery;