import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, TextField, useTheme, useMediaQuery, ThemeProvider, createTheme, CssBaseline
} from '@mui/material';

function PreviousReports() {
  const [reports, setReports] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
      async function fetchReports() {
          try {
              const token = localStorage.getItem('token');
              const reportsResponse = await axios.get('http://localhost:8080/api/previousReport', {
                   headers: {
                              'x-auth-token': token
                            }
              });
              setReports(reportsResponse.data);
          } catch (err) {
              console.error("Error:", err);
          }
      }
      fetchReports();
  }, []);

  const filteredReports = reports.filter(
    report =>
      report.contractName.toLowerCase().includes(searchValue.toLowerCase()) ||
      report.auditDate.includes(searchValue)
  );

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ marginBottom: '16px' }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Audits"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <TableContainer
        component={Paper}
        style={{ maxHeight: isSmallScreen ? 300 : 440, overflow: 'auto' }}>
        <Table stickyHeader aria-label="sticky responsive audit table">
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>Contract Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.reportId}>
                <TableCell>{report.reportId}</TableCell>
                <TableCell>{report.contractName}</TableCell>
                <TableCell>{report.auditDate}</TableCell>
                <TableCell>
                    <Button variant="contained" color="primary">
                        <a 
                            href={report.link} 
                            style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: 'block' }}
                        >
                            Download
                        </a>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export default PreviousReports;
