import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AuthenticationReducer from "../redux/reducer/AuthenticationSlice"
import storage from "redux-persist/lib/storage"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import ShopReducer from './reducer/ShopSlice';

const persistConfig = {
  key: "Vingo_root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  Auth: AuthenticationReducer,
  Shops: ShopReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
//persistor.purge()
export default store;


