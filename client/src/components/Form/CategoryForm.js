import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Enter new category"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CategoryForm;
