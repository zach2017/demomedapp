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

import {
  Person,
  CalendarMonth,
  Mail,
  Print
} from '@mui/icons-material';

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
import BottomNav from '../Molecules/BottomNav';
import FromDialog from './Forms/FormDialog';
import FormDialog from './Forms/FormDialog';
import FormComponent from '../Molecules/FormComponent';
import NewPatientForm from './Forms/NewPatientForm';


// Mock components for different sections
const PatientComponent = () => (
  <Box sx={{ p: 3 }}>
   <GridList items={sampleData} /> 
  </Box>
);

const TUCCSComponent = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5">TUCCS Section</Typography>
    <Typography>Your TUCCS content goes here</Typography>
  </Box>
);

const GallaryComponent = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5">Gallary Section</Typography>
    <Typography>Your Gallary content goes here</Typography>
  </Box>
);

const TriageComponent = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5">Triage Section</Typography>
    <Typography>Your Triage content goes here</Typography>
  </Box>
);

const TaesAppLayout = () => {
  const [mode, setMode] = useState('dark');
  const [bottomValue, setBottomValue] = useState(0);
  const [currentSection, setCurrentSection] = useState('patientList');
  const [formOpen, setFormOpen] = useState(false);

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

  const [openForm, setOpenForm] = useState(false);

  const handleOpen = () => {
    
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  var isOpen = openForm

  const handleSectionChange = (newSection) => {
    setCurrentSection(newSection);
  };

  const renderComponent = () => {
    
    switch (currentSection) {
      case 'patients':
        return <NewPatientForm  open={open}
        close={close} selectedSection={currentSection}
        onSectionChange={handleSectionChange} />;
      case 'TUCCS':
        return <TUCCSComponent />;
      case 'Triage':
        return <TriageComponent />;
      case 'Gallary':
          return <GallaryComponent />;
      default:
        return <PatientComponent />;
    }
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
              onClick = { handleOpen }
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             TAES
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
          </Toolbar>
        </AppBar>

        {/* Filter Section */}
        <Paper elevation={1} sx={{ p: 2 }}>
    
        </Paper>

        {/* Main Content */}
        <Container sx={{ flexGrow: 1, py: 2 }}>

       {/* {openForm ? <FormDialog  close={handleClose} /> :
        <GridList items={sampleData} /> 
        }*/}
        </Container>
          {/* Main Content */}
      <Container 
        component="main" 
        
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          py: 3
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            flexGrow: 1,
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {renderComponent()}
        </Paper>
      </Container>

       <Paper>
        <BottomNav   selectedSection={currentSection}
        onSectionChange={handleSectionChange} />
        
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default TaesAppLayout;