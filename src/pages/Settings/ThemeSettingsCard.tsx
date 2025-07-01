import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material';
import { ThemeMode } from '../../types';

export interface ThemeSettingsProps {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  onThemeChange: (e: React.ChangeEvent<{ value: unknown }> | { target: { value: string } }) => void;
  onPrimaryColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSecondaryColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ThemeSettingsCard: React.FC<ThemeSettingsProps> = ({
  mode,
  primaryColor,
  secondaryColor,
  onThemeChange,
  onPrimaryColorChange,
  onSecondaryColorChange,
}) => (
  <Card sx={{ flex: 1 }}>
    <CardHeader title='Theme Settings' avatar={<PaletteIcon color='primary' />} />
    <CardContent>
      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Theme Mode</InputLabel>
          <Select value={mode} label='Theme Mode' onChange={onThemeChange}>
            <MenuItem value={ThemeMode.LIGHT}>Light Theme</MenuItem>
            <MenuItem value={ThemeMode.DARK}>Dark Theme</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Typography gutterBottom>Primary Color</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              type='color'
              value={primaryColor}
              onChange={onPrimaryColorChange}
              style={{ width: '3rem', height: '2.5rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
            />
            <TextField value={primaryColor} onChange={onPrimaryColorChange} size='small' sx={{ flex: 1 }} />
          </Box>
        </Box>
        <Box>
          <Typography gutterBottom>Secondary Color</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              type='color'
              value={secondaryColor}
              onChange={onSecondaryColorChange}
              style={{ width: '3rem', height: '2.5rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
            />
            <TextField value={secondaryColor} onChange={onSecondaryColorChange} size='small' sx={{ flex: 1 }} />
          </Box>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default ThemeSettingsCard;
