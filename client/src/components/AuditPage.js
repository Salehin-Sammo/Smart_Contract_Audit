import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme, Grow, Box } from '@mui/material';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    transitions: {
      duration: {
        enteringScreen: 500,
        leavingScreen: 300,
      },
    },
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#555',
            },
          },
        },
      },
    },
});

function AuditPage() {
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        // Fetch the vulnerabilities on component mount
        const fetchVulnerabilities = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/parseAndSave/get-vulnerabilities', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setVulnerabilities(data.vulnerabilities);
                }
            } catch (error) {
                console.error('Failed to fetch vulnerabilities:', error);
            }
        };

        fetchVulnerabilities();
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box style={{ padding: '20px', color: 'white', opacity: 0, animation: `${theme.transitions.duration.enteringScreen}ms ease forwards fadeIn` }}>
                <Typography variant="h4" style={{ marginBottom: '20px' }}>Vulnerabilities</Typography>
                <Paper style={{ backgroundColor: 'transparent' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vulnerability Name</TableCell>
                                    <TableCell>Count</TableCell>
                                    <TableCell>Impact</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vulnerabilities.map((vuln, index) => (
                                    <Grow in timeout={(index + 1) * 300} key={vuln.vulnerabilityId}>
                                        <TableRow>
                                            <TableCell>{vuln.vulnerabilityName}</TableCell>
                                            <TableCell>{vuln.count}</TableCell>
                                            <TableCell>{vuln.impact}</TableCell>
                                            <TableCell>{vuln.description}</TableCell>
                                        </TableRow>
                                    </Grow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
            <style jsx global>{`
              @keyframes fadeIn {
                to {
                  opacity: 1;
                }
              }
            `}</style>
        </ThemeProvider>
    );
}

export default AuditPage;
