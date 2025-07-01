import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Slider,
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

export interface GeneralSettingsProps {
  appName: string;
  notifications: boolean;
  maintenanceMode: boolean;
  sessionTimeout: number;
  twoFactorAuth: boolean;
  onAppNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNotificationsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaintenanceModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSessionTimeoutChange: (e: Event, value: number | number[]) => void;
  onTwoFactorAuthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GeneralSettingsCard: React.FC<GeneralSettingsProps> = ({
  appName,
  notifications,
  maintenanceMode,
  sessionTimeout,
  twoFactorAuth,
  onAppNameChange,
  onNotificationsChange,
  onMaintenanceModeChange,
  onSessionTimeoutChange,
  onTwoFactorAuthChange,
}) => (
  <Card sx={{ flex: 1 }}>
    <CardHeader title='General Settings' avatar={<SettingsIcon color='primary' />} />
    <CardContent>
      <Stack spacing={3}>
        <TextField
          label='Application Name'
          value={appName}
          onChange={onAppNameChange}
          fullWidth
          helperText='The name displayed in the browser tab and header'
        />
        <FormControlLabel
          control={<Switch checked={notifications} onChange={onNotificationsChange} />}
          label='Enable Notifications'
        />
        <FormControlLabel
          control={<Switch checked={maintenanceMode} onChange={onMaintenanceModeChange} />}
          label='Maintenance Mode'
        />
        <Box>
          <Typography gutterBottom>Session Timeout: {sessionTimeout} minutes</Typography>
          <Slider
            value={sessionTimeout}
            onChange={onSessionTimeoutChange}
            min={5}
            max={120}
            step={5}
            marks
            valueLabelDisplay='auto'
          />
        </Box>
        <FormControlLabel
          control={<Switch checked={twoFactorAuth} onChange={onTwoFactorAuthChange} />}
          label='Two-Factor Authentication'
        />
      </Stack>
    </CardContent>
  </Card>
);

export default GeneralSettingsCard;
