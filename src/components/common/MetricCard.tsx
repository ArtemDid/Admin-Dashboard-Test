import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<SvgIconComponent>;
  color?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color = 'primary.main', sx, onClick }) => {
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant='h6' color='text.secondary' gutterBottom>
              {title}
            </Typography>
            <Typography variant='h4' fontWeight='bold' color='primary'>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
