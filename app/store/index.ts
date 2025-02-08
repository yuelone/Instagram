import { configureStore } from "@reduxjs/toolkit";
import { homeApi } from "services/home";
import { userApi } from "services/user"
import { commonApi } from "services/common"
import { followingApi } from "services/following";
import suggestedReducer from "slices/suggested";
import followingReducer from "slices/following";

export const reducers = {
  [homeApi.reducerPath]: homeApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [followingApi.reducerPath]: followingApi.reducer,
  suggestedReducer,
  followingReducer
};

const apiMiddlewares = [
  homeApi.middleware,
  userApi.middleware,
  commonApi.middleware,
  followingApi.middleware
];

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;