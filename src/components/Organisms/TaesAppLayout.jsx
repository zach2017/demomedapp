import React, { useState, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  Container,
  BottomNavigation,
  BottomNavigationAction,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';

import GridList from '../Molecules/GridList'

import {
  Menu as MenuIcon,
  Print as PrintIcon,
  Sync as SyncIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Wifi as WifiIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Home as HomeIcon,
  Mail as MailIcon,
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Camera as CameraIcon
} from '@mui/icons-material';
import sampleData from '../../utilities/sampledata'


const TaesAppLayout = () => {
  const [mode, setMode] = useState('light');
  const [bottomValue, setBottomValue] = useState(0);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const buttonStyles = {
    minWidth: 120,
    px: 3,
    py: 1,
    mx: 1,
    boxShadow: 3,
    '&:hover': {
      boxShadow: 6,
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              App Title
            </Typography>

            <IconButton color="inherit">
              <PrintIcon />
            </IconButton>
            <IconButton color="inherit">
              <SyncIcon />
            </IconButton>
            <IconButton 
              color="inherit"
              onClick={handleThemeToggle}
              aria-label="toggle theme"
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton color="inherit">
              <WifiIcon />
            </IconButton>
            <Button 
              color="inherit" 
              startIcon={<SearchIcon />}
              sx={{ ml: 1 }}
            >
              Search
            </Button>
          </Toolbar>
        </AppBar>

        {/* Filter Section */}
        <Paper elevation={1} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search..."
              sx={{ maxWidth: 300 }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
          </Box>
        </Paper>

        {/* Main Content */}
        <Container sx={{ flexGrow: 1, py: 2 }}>
        <GridList items={sampleData} />
        </Container>

        {/* Footer */}
        <Paper 
          elevation={3} 
          sx={{ 
            width: '100%', 
            position: 'sticky', 
            bottom: 0 
          }}
        >
          {/* First row of buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              p: 1,
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
           <Button 
              variant="contained" 
              startIcon={<BusinessIcon />}
              sx={buttonStyles}
            >
              TCCC
            </Button>
            <Button 
              variant="contained" 
              startIcon={<PersonIcon />}
              sx={buttonStyles}
            >
              Patient
            </Button>
            <Button 
              variant="contained" 
              startIcon={<CameraIcon />}
              sx={buttonStyles}
            >
              Capture
            </Button>
          </Box>

          {/* Second row with icon buttons */}
          <BottomNavigation 
            value={bottomValue} 
            onChange={(event, newValue) => {
              setBottomValue(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Mail" icon={<MailIcon />} />
            <BottomNavigationAction label="Calendar" icon={<CalendarIcon />} />
            <BottomNavigationAction label="Clock" icon={<ClockIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default TaesAppLayout;