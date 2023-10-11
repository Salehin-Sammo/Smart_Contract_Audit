//Jannatul Rakib Joy 103799644
import React from 'react';
import { Checkbox, FormControlLabel, TextField, Box, Typography, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Create a dark theme using MUI's createTheme
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set the theme mode to dark
    background: {
      default: '#1a1a1a', // Set default background color
    },
    text: {
      primary: '#fff', // Set text color
    },
  },
});

function AuditResults() {
  return (
    // Wrap the component in a dark theme using ThemeProvider
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Apply baseline CSS */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        margin: 'auto',
        marginTop: '4%',
        padding: 2,
        '@media (max-width:600px)': {
          flexDirection: 'column',
        }
      }}>
        {/* Left section */}
        <Box sx={{
          flex: 1,
          marginRight: 4,
          marginBottom: 2,
          width: '100%',
          margin: 'auto',
          '@media (max-width:600px)': {
            marginBottom: 2,
            width: '100%',
            margin: 'auto'
          }
        }}>
          <Typography variant="h6" sx={{ marginBottom: '20px', fontSize: '25px' }}>Security Assessment</Typography>
          <Typography variant="body1" sx={{ marginBottom: 8 }}>How many faults?</Typography>
          {/* Colored box for displaying number of faults */}
          <Box sx={{
            marginTop: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100px',
            height: '100px',
            transform: 'rotate(45deg)',
            background: '#3f51b5', // Set background color
            borderRadius: '20px'
          }}>
            <Typography variant="body1" sx={{
              transform: 'rotate(-45deg)',
              color: 'white',
              fontWeight: 'semibold',
              fontSize: '20px'
            }}>5 faults</Typography>
          </Box>
        </Box>
        {/* Right section */}
        <Box sx={{
          flex: 1,
          '@media (max-width:600px)': {
            marginBottom: 2,
            width: '100%'
          }
        }}>
          {/* Checkbox for language solidity */}
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Language solidity"
          />
          <Typography variant="body1">Request Date</Typography>
          {/* Date input for request date */}
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            defaultValue="2023-08-22"
            disabled
          />
          <Typography variant="body1" sx={{ marginTop: 16 }}>Revision Date</Typography>
          {/* Date input for revision date */}
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            defaultValue="2023-09-02"
            disabled
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AuditResults;
