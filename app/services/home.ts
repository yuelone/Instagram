import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LimitedTimePost = {
  id: string;
  name: string;
  avatar: string;
};

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getLimitedTimePost: builder.query<LimitedTimePost[], string | void>({
      query: (id) => {
        if (id) {
          return `limitedTimePost/${id}`;
        }
        return "limitedTimePost";
      },
    }),
  }),
});

export const { useGetLimitedTimePostQuery } = homeApi;