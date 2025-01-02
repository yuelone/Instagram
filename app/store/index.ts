
import { configureStore } from "@reduxjs/toolkit";
import { homeApi } from "services/home";
import suggestedReducer from "@/slices/suggested";

export const store = configureStore({
  reducer: {
    [homeApi.reducerPath]: homeApi.reducer,
    suggestedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;