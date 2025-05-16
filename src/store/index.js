import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import userProfileReducer from './slices/userProfileSlice';

// Configure persist options
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'userProfile']
};

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);