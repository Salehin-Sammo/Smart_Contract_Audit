//Jannatul Rakib Joy 103799644
import React, { useState } from 'react';
import { Container, Grid, Select, MenuItem, FormControl, InputLabel, ThemeProvider, createTheme } from '@mui/material';
import PieChart from './PieChart'; // Import the PieChart component

// Create a dark theme using MUI's createTheme
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set the theme mode to dark
    background: {
      default: '#000', // Set default background color
    },
    text: {
      primary: '#fff', // Set text color
    },
  },
});

function AuditReport() {
  // Initial data for the PieChart
  const initialData = [
    { name: 'Reentrancy Vulnerability', value: 30, vulnerabilities: "...", solutions: "...", level: 'high' },
    { name: 'Integer Overflow/Underflow Vulnerability', value: 25, vulnerabilities: "...", solutions: "...", level: 'high' },
    { name: 'Unauthorized Access Vulnerability', value: 20, vulnerabilities: "...", solutions: "...", level: 'medium' },
    { name: 'Denial of Service (DoS) Vulnerabilities', value: 15, vulnerabilities: "...", solutions: "...", level: 'low' },
    { name: 'Uninitialized Variables', value: 10, vulnerabilities: "...", solutions: "...", level: 'low' }
  ];

  const [data, setData] = useState(initialData); // State for PieChart data
  const [selectedData, setSelectedData] = useState([]); // State for selected data

  // Handle change in vulnerability selection
  const handleVulnerabilityChange = (event) => {
    const filteredData = event.target.value === "" ? initialData : initialData.filter(d => d.level === event.target.value);
    setData(filteredData);
    setSelectedData(filteredData);
  };

  return (
    // Wrap the component in a dark theme using ThemeProvider
    <ThemeProvider theme={darkTheme}>
      <Container style={{ width: '80%', margin: '4% auto' }}>
        <Grid container spacing={3}>
          {/* Left section: PieChart */}
          <Grid item xs={12} md={8} style={{ margin: 'auto' }}>
            <PieChart data={data} selectedData={selectedData} onSegmentClick={setSelectedData} />
          </Grid>
          {/* Right section: Vulnerability Type selection */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel style={{ fontSize: '20px' }}>Vulnerability Type</InputLabel>
              {/* Select dropdown for vulnerability level */}
              <Select value={selectedData.length > 0 ? selectedData[0].level : ""} onChange={handleVulnerabilityChange}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AuditReport;
