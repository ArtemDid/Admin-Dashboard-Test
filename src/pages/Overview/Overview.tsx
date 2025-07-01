import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import MetricCard from '../../components/common/MetricCard';

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: 'primary.main',
  },
  {
    title: 'Active Sessions',
    value: '567',
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    color: 'success.main',
  },
  {
    title: 'System Status',
    value: 'Online',
    icon: <DashboardIcon sx={{ fontSize: 40 }} />,
    color: 'success.main',
  },
  {
    title: 'Configurations',
    value: '89',
    icon: <SettingsIcon sx={{ fontSize: 40 }} />,
    color: 'warning.main',
  },
];

const Overview: React.FC = () => {
  return (
    <Box>
      <Typography variant='h4' gutterBottom fontWeight='bold' color='primary'>
        Dashboard Overview
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        Welcome to your admin dashboard. Here's an overview of your system.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {stats.map(stat => (
          <Box key={stat.title} sx={{ flex: '1 1 250px', minWidth: '250px' }}>
            <MetricCard title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Overview;
