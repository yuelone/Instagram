import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type IsFollowing = {
  id: string;
  type: string;
  isFollowing: boolean
};

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/common" }),
  endpoints: (builder) => ({
    updateIsFollowing: builder.mutation<IsFollowing, Partial<IsFollowing>>({
      query: (updatedIsFollowing) => ({
        url: `isFollowing/${updatedIsFollowing.id}`,
        method: "PATCH",
        body: updatedIsFollowing,
      }),
    }),
  }),
});

export const { useUpdateIsFollowingMutation } = commonApi;