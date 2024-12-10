// React
import React, { useState } from "react";

// MUI
import { BottomNavigation, BottomNavigationAction } from '@mui/material'

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ImageIcon from "@mui/icons-material/Image";

//import { Link } from "react-router-dom";

function BottomNav() {
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
   <div
    style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",//need css?
    zIndex: 1000,
    }}
     >        
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
    >
      <BottomNavigationAction
        label="Patients"
        icon={
          <span style={getIconStyle(value === 0)}>
            <PersonIcon />
          </span>
        }
        showLabel
       
        to="/"
      />
      <BottomNavigationAction
        label="TUCCS"
        icon={
          <span style={getIconStyle(value === 1)}>
            <AccessTimeIcon />
          </span>
        }
        showLabel
  
        to="/tucs"
      />
      <BottomNavigationAction
        label="Triage"
        icon={
          <span style={getIconStyle(value === 2)}>
            <CalendarMonthIcon />
          </span>
        }
        showLabel
    
        to="/triage"
      />
      <BottomNavigationAction
        label="Gallery"
        icon={
          <span style={getIconStyle(value === 3)}>
            <ImageIcon />
          </span>
        }
        showLabel
      />
    </BottomNavigation>
  </div>
  );
}

export default BottomNav;

