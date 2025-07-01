import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './Sidebar.js';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
});

const Layout: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', minWidth: '100vw', fontSize: '16px' }}>
        <Sidebar open={sidebarOpen} onToggle={toggleSidebar} isMobile={isMobile} />

        {/* Main content area - full width background */}
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
            width: '100%',
            transition: 'margin-left 0.3s ease',
            ml: {
              xs: 0,
              md: sidebarOpen ? '17.5rem' : 0,
            },
          }}
        >
          {/* Top bar with menu button - show on mobile and when sidebar is closed on desktop */}
          <AppBar
            position='static'
            sx={{
              backgroundColor: 'white',
              color: 'text.primary',
              boxShadow: '0 0.0625rem 0.1875rem rgba(0,0,0,0.1)',
              display: {
                xs: 'block',
                md: sidebarOpen ? 'none' : 'block',
              },
              height: '3.5rem',
            }}
          >
            <Toolbar sx={{ minHeight: '3.5rem' }}>
              <IconButton
                edge='start'
                color='inherit'
                aria-label='menu'
                onClick={toggleSidebar}
                sx={{
                  mr: '1rem',
                  fontSize: '1.5rem',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' color='primary' fontWeight='bold' sx={{ fontSize: '1.125rem' }}>
                Admin Dashboard
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Content container - centered with max width */}
          <Container
            maxWidth={false}
            sx={{
              width: '100%',
              p: {
                xs: '1rem',
                sm: '1.5rem',
                md: '2rem',
                lg: '2.5rem',
              },
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: {
                  xs: '100%',
                  sm: '100%',
                  md: '75rem',
                  lg: '87.5rem',
                  xl: '100rem',
                },
                mx: 'auto',
              }}
            >
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
