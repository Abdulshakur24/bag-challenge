import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  userReducer,
  toVisitReducer,
  visitedReducer,
  listReducer,
} from "./slicers";

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
  user: userReducer,
  toVisit: toVisitReducer,
  visited: visitedReducer,
  list: listReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: "1.0.1",
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
