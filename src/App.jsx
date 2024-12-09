// React
import React, { useState } from 'react'

// router
import { BrowserRouter, HashRouter } from "react-router-dom"

// MUI
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ProtectedRoute from './security/ProtectedRoute'
//import ContentNavigation from './components/Organisms/ContentNavigation'

import TopMenuNavigation
 from './components/Organisms/TopMenuNavigation'
import { StorageContextProvider } from './context/StorageContext'
import PatientListing from './components/Organisms/PatientListing'
import GridList from './components/Molecules/GridList'
import sampleData from './utilities/sampledata'
import TaesAppLayout from './components/Organisms/TaesAppLayout'

function Router(props) {
  
  const deployment = import.meta.VITE_API_URL
  /* istanbul ignore if: deployment config */
  if (deployment === "github") {
    return (
      <HashRouter>
        {props.children}
      </HashRouter>
    )
  }
  return (
    <BrowserRouter>
      {props.children}
    </BrowserRouter>
  )
}

function App() {

  const [themeMode, setThemeMode] = useState("dark");    

  const handleThemeMode = (value) => {
    setThemeMode(value);
  };

  let currentTheme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (

    <ProtectedRoute>
      { /*<Router>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StorageContextProvider>
            <ThemeProvider theme={currentTheme}>
              <CssBaseline />
              <TopMenuNavigation onModeChange={handleThemeMode} />
          

             <GridList items={sampleData} />
            </ThemeProvider>
          </StorageContextProvider>
        </LocalizationProvider>
      </Router> */}
      <TaesAppLayout/>
    </ProtectedRoute>
  
  );
}

export default App