import { configureStore } from '@reduxjs/toolkit'
// import { persistReducer,
// FLUSH,
// REHYDRATE,
// PAUSE,
// PERSIST,
// PURGE,
// REGISTER,
//} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import userReducer from './slicers/user'
import toVisitReducer from './slicers/toVisit'
import visitReducer from './slicers/visited'
import listReducer from './slicers/list'

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }

// const rootReducer = combineReducers({
//   user: userReducer,
//   home: homeReducer,
//   visit: visitReducer,
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer: {
    user: userReducer,
    toVisit: toVisitReducer,
    visited: visitReducer,
    list: listReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoreActions: [],
  //     },
  //   }),
})
