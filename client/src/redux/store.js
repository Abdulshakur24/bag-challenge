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

const rootReducer = combineReducers({
  user,
  toVisit,
  myList,
  visited,
});

const persistConfig = {
  key: "root",
  storage,
  version: "2.0.0",
  whitelist: ["toVisit"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
