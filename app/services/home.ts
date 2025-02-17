import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LimitedTimePost = {
  id: string;
  avatar: string;
  account: string;
};

type Post = {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  subtitle: string;
  photos: string[];
  likes: number;
  description: string;
  hashTags: string[];
  createTime: string;
};

type Suggested = {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  subtitle: string;
  isFollowing: boolean
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
    getPost: builder.query<Post[], string | void>({
      query: (id) => {
        if (id) {
          return `post/${id}`;
        }
        return "post";
      },
    }),
    getSuggested: builder.query<Suggested[], void>({
      query: () => "suggested"
    }),
  }),
});

export const { useGetLimitedTimePostQuery, useGetPostQuery, useGetSuggestedQuery } = homeApi;