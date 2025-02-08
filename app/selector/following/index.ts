import { useAppSelector } from "hook/customReduxHook";

export const useFollowingData = () =>
  useAppSelector((state) => state.followingReducer.following);