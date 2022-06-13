import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { user, toVisit, myList, visited } from "./slicers";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import { restcountriesAPI } from "src/utils/api";

const rootReducer = combineReducers({
  user,
  toVisit,
  myList,
  visited,
  [restcountriesAPI.reducerPath]: restcountriesAPI.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 2,
  whitelist: ["toVisit"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(restcountriesAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
