import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import { Save as SaveIcon, Refresh as RefreshIcon } from '@mui/icons-material';

interface SettingsActionsProps {
  hasChanges: boolean;
  onDiscard: () => void;
  onReset: () => void;
  onSave: () => void;
}

const SettingsActions: React.FC<SettingsActionsProps> = ({ hasChanges, onDiscard, onReset, onSave }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
    <Box sx={{ display: 'flex', gap: 1 }}>
      {hasChanges && <Chip label='Unsaved Changes' color='warning' variant='outlined' size='small' />}
    </Box>
    <Box sx={{ display: 'flex', gap: 2 }}>
      {hasChanges && (
        <Button variant='outlined' size='large' onClick={onDiscard}>
          Discard Changes
        </Button>
      )}
      <Button variant='outlined' size='large' startIcon={<RefreshIcon />} onClick={onReset}>
        Reset to Default
      </Button>
      <Button
        variant='contained'
        size='large'
        startIcon={<SaveIcon />}
        onClick={onSave}
        disabled={!hasChanges}
        sx={{ borderRadius: 2 }}
      >
        Save Settings
      </Button>
    </Box>
  </Box>
);

export default SettingsActions;
