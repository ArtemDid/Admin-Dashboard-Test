import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateSettings, resetSettings } from '../../store/slices/settingsSlice';
import { setThemeMode, setPrimaryColor, setSecondaryColor } from '../../store/slices/themeSlice';
import { ThemeMode } from '../../types';
import GeneralSettingsCard from './GeneralSettingsCard';
import ThemeSettingsCard from './ThemeSettingsCard';
import SecuritySettingsCard from './SecuritySettingsCard';
import SettingsActions from './SettingsActions';
import NotificationSnackbar from '../../components/common/NotificationSnackbar';

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector(state => state.settings);
  const { mode, primaryColor, secondaryColor } = useAppSelector(state => state.theme);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);
  const [tempTheme, setTempTheme] = useState({ mode, primaryColor, secondaryColor });

  const handleAppNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSettings(prev => ({ ...prev, appName: event.target.value }));
  };
  const handleNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSettings(prev => ({ ...prev, notifications: event.target.checked }));
  };
  const handleMaintenanceModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSettings(prev => ({ ...prev, maintenanceMode: event.target.checked }));
  };
  const handleSessionTimeoutChange = (event: Event, newValue: number | number[]) => {
    setTempSettings(prev => ({ ...prev, sessionTimeout: newValue as number }));
  };
  const handleTwoFactorAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSettings(prev => ({ ...prev, twoFactorAuth: event.target.checked }));
  };

  const handleThemeChange = (event: React.ChangeEvent<{ value: unknown }> | { target: { value: string } }) => {
    const newTheme = event.target.value as ThemeMode;
    setTempTheme(prev => ({ ...prev, mode: newTheme }));
  };
  const handlePrimaryColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempTheme(prev => ({ ...prev, primaryColor: event.target.value }));
  };
  const handleSecondaryColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempTheme(prev => ({ ...prev, secondaryColor: event.target.value }));
  };

  const handleSave = () => {
    dispatch(updateSettings(tempSettings));
    dispatch(setThemeMode(tempTheme.mode));
    dispatch(setPrimaryColor(tempTheme.primaryColor));
    dispatch(setSecondaryColor(tempTheme.secondaryColor));
    setShowSuccess(true);
  };
  const handleReset = () => {
    dispatch(resetSettings());
    setTempSettings(settings);
    setTempTheme({ mode, primaryColor, secondaryColor });
    setShowReset(true);
  };
  const handleDiscardChanges = () => {
    setTempSettings(settings);
    setTempTheme({ mode, primaryColor, secondaryColor });
  };
  const hasChanges = () => {
    return (
      JSON.stringify(tempSettings) !== JSON.stringify(settings) ||
      JSON.stringify(tempTheme) !== JSON.stringify({ mode, primaryColor, secondaryColor })
    );
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom fontWeight='bold' color='primary'>
        Settings
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        Manage your application settings and preferences.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <GeneralSettingsCard
            appName={tempSettings.appName}
            notifications={tempSettings.notifications}
            maintenanceMode={tempSettings.maintenanceMode}
            sessionTimeout={tempSettings.sessionTimeout}
            twoFactorAuth={tempSettings.twoFactorAuth}
            onAppNameChange={handleAppNameChange}
            onNotificationsChange={handleNotificationsChange}
            onMaintenanceModeChange={handleMaintenanceModeChange}
            onSessionTimeoutChange={handleSessionTimeoutChange}
            onTwoFactorAuthChange={handleTwoFactorAuthChange}
          />
          <ThemeSettingsCard
            mode={tempTheme.mode}
            primaryColor={tempTheme.primaryColor}
            secondaryColor={tempTheme.secondaryColor}
            onThemeChange={handleThemeChange}
            onPrimaryColorChange={handlePrimaryColorChange}
            onSecondaryColorChange={handleSecondaryColorChange}
          />
        </Box>
        <SecuritySettingsCard
          twoFactorAuth={tempSettings.twoFactorAuth}
          sessionTimeout={tempSettings.sessionTimeout}
          notifications={tempSettings.notifications}
          maintenanceMode={tempSettings.maintenanceMode}
        />
        <SettingsActions
          hasChanges={hasChanges()}
          onDiscard={handleDiscardChanges}
          onReset={handleReset}
          onSave={handleSave}
        />
      </Box>

      {/* Success Notification */}
      <NotificationSnackbar
        open={showSuccess}
        message='Settings saved successfully!'
        severity='success'
        onClose={() => setShowSuccess(false)}
      />

      {/* Reset Notification */}
      <NotificationSnackbar
        open={showReset}
        message='Settings reset to default values!'
        severity='info'
        onClose={() => setShowReset(false)}
      />
    </Box>
  );
};

export default Settings;
