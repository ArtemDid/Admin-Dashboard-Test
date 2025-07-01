import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from '../../types';

interface ThemeState {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
}

const initialState: ThemeState = {
  mode: ThemeMode.LIGHT,
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      document.body.className = action.payload === ThemeMode.DARK ? 'dark-theme' : 'light-theme';
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.secondaryColor = action.payload;
    },
  },
});

export const { setThemeMode, setPrimaryColor, setSecondaryColor } = themeSlice.actions;

export default themeSlice.reducer;
