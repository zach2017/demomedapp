
import React, { useState } from 'react';
import {
  Card,
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const GridItem = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className="flex w-full mb-4">
       <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 1 }}>
        <CardMedia
          component="img"
          sx={{ 
            width: 48,
            height: 48,
            objectFit: 'cover',
            mr: 2
          }}
          image={item.image}
          alt={item.title}
        />
        <Typography variant="subtitle1" sx={{ mr: 2 }}>#{item.id}</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1">{item.title}</Typography>
          <Typography variant="body2" color="textSecondary">{item.description}</Typography>
        </Box>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>TCCC</MenuItem>
        <MenuItem onClick={handleClose}>Vitals</MenuItem>
        <MenuItem onClick={handleClose}>Meds</MenuItem>
        <MenuItem onClick={handleClose}>Notes</MenuItem>
      </Menu>
      <CardActions>
            <Box sx={{ flexGrow: 1 }} />
            <ButtonGroup>
                <Button
                    variant="contained"
                    onClick={() => setTccOpen(true)}
                >
                    TCCC
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setVitalsOpen(true)}
                >
                    Vitals
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setMedsOpen(true)}
                >
                    Meds
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setNotesOpen(true)}
                >
                    Notes
                </Button>
            </ButtonGroup>
        </CardActions>
    </Card>
  );
};

export default GridItem;