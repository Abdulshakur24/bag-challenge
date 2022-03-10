import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slicers/user'
import toVisitReducer from './slicers/toVisit'
import visitedReducer from './slicers/visited'
import listReducer from './slicers/list'

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist'

import storage from 'reduxjs-toolkit-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  version: '1.0.1',
}

const rootReducer = combineReducers({
  user: userReducer,
  toVisit: toVisitReducer,
  visited: visitedReducer,
  list: listReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          false,
        ],
      },
    }),
})
