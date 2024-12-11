// React
import React, { useState } from "react";

// MUI
import { BottomNavigation, BottomNavigationAction,  Paper } from '@mui/material'

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ImageIcon from "@mui/icons-material/Image";

//import { Link } from "react-router-dom";


import {
  Person,
  CalendarMonth,
  Mail,
  Print
} from '@mui/icons-material';

function BottomNav( { selectedSection, onSectionChange } ) {
  const [value, setValue] = useState(0);

  const getIconStyle = (isSelected) => ({
    backgroundColor: isSelected ? "rgba(128, 128, 128, 0.2)" : "transparent",//need css?
    borderRadius: "20px",
    padding: "5px 15px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <>
    <Paper 
    sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
    elevation={3}
  >
    <BottomNavigation
      showLabels
      value={selectedSection}
      onChange={(event, newValue) => {
        onSectionChange(newValue);
      }}
    >
      <BottomNavigationAction
        label="Patients"
        value="patients"
        icon={ <PersonIcon />}
      />
      <BottomNavigationAction
        label="TUCCS"
        value="TUCCS"
        icon={
          <span style={getIconStyle(value === 1)}>
            <AccessTimeIcon />
          </span>
        }
      />
      <BottomNavigationAction
         label="Triage"
         value="Triage"
         icon={
           <span style={getIconStyle(value === 2)}>
             <CalendarMonthIcon />
           </span>
         }
      />
      <BottomNavigationAction
         label="Gallery"
         value="Gallary"
         icon={
           <span style={getIconStyle(value === 3)}>
             <ImageIcon />
           </span>
         }
      />
    </BottomNavigation>
    
  </Paper> 
  </>)

}

export default BottomNav;

