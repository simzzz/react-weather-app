import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API using createApi
export const appApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: (builder) => ({})
});
