import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Following = {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  isFollowing: boolean
};

export const followingApi = createApi({
  reducerPath: "followingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getFollowing: builder.query<Following[], void>({
      query: () => "following"
    }),
  }),
});

export const { useGetFollowingQuery } = followingApi;