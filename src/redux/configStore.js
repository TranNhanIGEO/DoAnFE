import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import {
  authSlice,
  userSlice,
  schoolSlice,
  statisticSlice,
  scoreSlice,
} from "./";

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage: storage,
  blacklist: ["register"],
  whitelist: ["login"],
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  users: userSlice,
  school: schoolSlice,
  score: scoreSlice,
  statistic: statisticSlice,
});
const rootPersistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: ["map", "users", "data", "school", "auth", "score", "statistic"],
};
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const configStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(configStore);

export { configStore, persistor };
