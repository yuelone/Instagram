import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  subtitle: string;
  isFollowing: boolean
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => "user"
    }),
  }),
});

export const { useGetUserQuery } = userApi;