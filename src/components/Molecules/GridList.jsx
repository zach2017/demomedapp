import React, { useState, useMemo } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  Grid2,
} from '@mui/material';
import { Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import GridItem from './GridItem';


const GridList = ({ items }) => {


  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = useMemo(() =>
    items.filter(item =>
      item?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) || false
    ),
    [items, searchQuery]
  );


  return (
    <Box className="min-h-screen bg-gray-100">
      <AppBar position="sticky">
        <Toolbar>
          <div className="flex grow items-center bg-white/20 rounded px-2">
            <SearchIcon className="mr-2" />
            <InputBase
              placeholder="Search..."
              className="flex-grow text-white"
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
            />
          </div>
        </Toolbar>
      </AppBar>
      <hr></hr>
      <Box className="p-4">
        <Grid2 container spacing={2}>
          {filteredItems.map((item) => (
            <Grid2 xs={12} md={6} lg={4} key={item.id}>
              <GridItem item={item} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default GridList;