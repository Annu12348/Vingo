import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AuthenticationReducer from '../redux/reducer/AuthenticationSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import ShopReducer from './reducer/ShopReducer';
import ItemReducer from './reducer/ItemReducer';

const persistConfig = {
  key: 'Vingo_root',
  version: 1,
  storage,
  whitelist: ['Auth'], // Only Auth state is persisted
};

const rootReducer = combineReducers({
  Auth: AuthenticationReducer,
  Shop: ShopReducer,
  Item: ItemReducer,
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
export default store;

//1:00 to 3:00 = 2
//1:00 to 3:12 = 2:12
//4:19 to 6:18 = 2:00
//total = 6:12