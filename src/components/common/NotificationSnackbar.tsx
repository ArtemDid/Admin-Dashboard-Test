import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';

export interface NotificationSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  onClose: () => void;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 3000,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
}) => (
  <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={anchorOrigin}>
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default NotificationSnackbar;
