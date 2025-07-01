import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';

export interface SecuritySettingsProps {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  notifications: boolean;
  maintenanceMode: boolean;
}

const SecuritySettingsCard: React.FC<SecuritySettingsProps> = ({
  twoFactorAuth,
  sessionTimeout,
  notifications,
  maintenanceMode,
}) => (
  <Card>
    <CardHeader title='Security Settings' avatar={<SecurityIcon color='primary' />} />
    <CardContent>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: '1 1 200px', textAlign: 'center', p: 2 }}>
          <Typography variant='h6' color='primary'>
            {twoFactorAuth ? 'Enabled' : 'Disabled'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            2FA Status
          </Typography>
        </Box>
        <Box sx={{ flex: '1 1 200px', textAlign: 'center', p: 2 }}>
          <Typography variant='h6' color='primary'>
            {sessionTimeout}m
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Session Timeout
          </Typography>
        </Box>
        <Box sx={{ flex: '1 1 200px', textAlign: 'center', p: 2 }}>
          <Typography variant='h6' color='primary'>
            {notifications ? 'On' : 'Off'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Notifications
          </Typography>
        </Box>
        <Box sx={{ flex: '1 1 200px', textAlign: 'center', p: 2 }}>
          <Typography variant='h6' color='primary'>
            {maintenanceMode ? 'Active' : 'Inactive'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Maintenance Mode
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default SecuritySettingsCard;
