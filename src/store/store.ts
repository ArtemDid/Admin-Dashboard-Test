import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice.js';
import settingsReducer from './slices/settingsSlice.js';
import themeReducer from './slices/themeSlice.js';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    settings: settingsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
