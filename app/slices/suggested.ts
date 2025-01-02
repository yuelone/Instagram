import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Suggested = {
  id: string;
  avatar: string;
  account: string;
  verify: boolean;
  subtitle: string;
  isFollowing: boolean
};

type suggestedState = {
  suggested: Suggested[];
};

const initialState: suggestedState = { suggested: [], }

export const suggestedSlice = createSlice({
  name: "suggestedList",
  initialState,
  reducers: {
    setSuggestedList: (state, action: PayloadAction<Suggested[]>) => {
      state.suggested = action.payload;
    },
    updateSuggested: (state, action: PayloadAction<{ id: string; updateData: Partial<Suggested> }>) => {
      const { id, updateData } = action.payload;
      const suggestedIndex = state.suggested.findIndex((post) => post.id === id);
      if (suggestedIndex !== -1) {
        state.suggested[suggestedIndex] = { ...state.suggested[suggestedIndex], ...updateData };
      }
    },
  },
});

export const { setSuggestedList, updateSuggested } = suggestedSlice.actions;

export default suggestedSlice.reducer;