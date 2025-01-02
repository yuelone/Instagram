import { configureStore } from "@reduxjs/toolkit";
import { homeApi } from "services/home";
import { userApi } from "services/user"
import suggestedReducer from "@/slices/suggested";

export const reducers = {
  [homeApi.reducerPath]: homeApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  suggestedReducer,
};

const apiMiddlewares = [homeApi.middleware, userApi.middleware];

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;