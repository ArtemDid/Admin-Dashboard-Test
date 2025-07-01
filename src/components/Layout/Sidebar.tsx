import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      text: 'Overview',
      icon: <DashboardIcon sx={{ fontSize: '1.25rem' }} />,
      path: '/overview',
    },
    {
      text: 'Users',
      icon: <PeopleIcon sx={{ fontSize: '1.25rem' }} />,
      path: '/users',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon sx={{ fontSize: '1.25rem' }} />,
      path: '/settings',
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onToggle();
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        width: '17.5rem',
        height: '100vh',
        backgroundColor: 'white',
        borderRight: '0.0625rem solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: '1.5rem',
          borderBottom: '0.0625rem solid #e0e0e0',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant='h6'
          color='primary'
          fontWeight='bold'
          sx={{
            fontSize: '1.25rem',
          }}
        >
          Admin Dashboard
        </Typography>
        {!isMobile && (
          <IconButton
            onClick={onToggle}
            size='small'
            sx={{
              fontSize: '1.25rem',
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, pt: '1rem' }}>
        <List sx={{ p: 0 }}>
          {menuItems.map(item => (
            <ListItem key={item.text} sx={{ p: 0 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: '0.75rem',
                  mb: '0.25rem',
                  borderRadius: '0.5rem',
                  backgroundColor: location.pathname === item.path ? 'primary.main' : 'transparent',
                  color: location.pathname === item.path ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: location.pathname === item.path ? 'primary.dark' : 'rgba(25, 118, 210, 0.08)',
                  },
                  py: '0.75rem',
                  px: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: '2rem',
                    fontSize: '1.25rem',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant='temporary'
        open={open}
        onClose={onToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '17.5rem',
            border: 'none',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant='persistent'
      open={open}
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '17.5rem',
          border: 'none',
          position: 'fixed',
          height: '100vh',
          zIndex: 1200,
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;
