import React from 'react';
import TextField from '@mui/material/TextField';

function WidgetSearch({ onSearch }) {
  return (
    <TextField
      label="Search Widgets"
      variant="outlined"
      fullWidth
      onChange={(e) => onSearch(e.target.value)}
      sx={{ mb: 2 }}
    />
  );
}

export default WidgetSearch;