import { useAppSelector } from "hook/customReduxHook";

export const useSuggestedData = () =>
  useAppSelector((state) => state.suggestedReducer.suggested);