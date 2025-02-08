import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Following = {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  isFollowing: boolean;
};

type FollowingUsersState = {
  following: Following[];
};

const initialState: FollowingUsersState = { following: [] };

export const followingUsersSlice = createSlice({
  name: "following",
  initialState,
  reducers: {
    setFollowingUsers: (state, action: PayloadAction<Following[]>) => {
      state.following = action.payload;
    },
    removeFollowingUser: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter((user) => user.id !== action.payload);
    },
  },
});

export const {
  setFollowingUsers,
  removeFollowingUser,
} = followingUsersSlice.actions;

export default followingUsersSlice.reducer;
