import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// fix the styling later
/*
.MuiSelect-select {
  padding: 8px 20px;
}
*/
const Dropdown = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState('');

  function navigateTo(filterType: string) {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has('sort')) {
      queryParams.delete('sort');
    }
    queryParams.append('sort', filterType);
    navigate(`?${queryParams.toString()}`);
  }

  const handleChange = (event: SelectChangeEvent) => {
    const val = event.target.value as string;
    setFilter(val);
    navigateTo(val);
  };

  return (
    <Box sx={{ minWidth: 120 }} className="mr-5">
      <FormControl fullWidth>
        <InputLabel id="drop down">Sort by</InputLabel>
        <Select
          labelId="drop down"
          id="demo-simple-select"
          variant="standard"
          value={filter}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value="recent">Recent</MenuItem>
          <MenuItem value="popular">Popular</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
