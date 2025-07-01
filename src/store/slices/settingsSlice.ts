import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Settings {
  appName: string;
  notifications: boolean;
  maintenanceMode: boolean;
  sessionTimeout: number;
  twoFactorAuth: boolean;
}

interface SettingsState {
  settings: Settings;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: {
    appName: 'Admin Dashboard',
    notifications: true,
    maintenanceMode: false,
    sessionTimeout: 30,
    twoFactorAuth: true,
  },
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<Settings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    resetSettings: state => {
      state.settings = initialState.settings;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { updateSettings, resetSettings, setLoading, setError } = settingsSlice.actions;

export default settingsSlice.reducer;
