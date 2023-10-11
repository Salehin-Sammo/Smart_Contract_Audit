//Jannatul Rakib Joy 103799644
import React from 'react';
import {
    Paper,
    Typography,
    Grid,
    Container,
    Divider,
    ThemeProvider,
    createTheme,
} from '@mui/material';

// Create a dark theme using MUI's createTheme
const theme = createTheme({
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

// Dummy data for displaying audit findings
const dummyData = [
    {
        category: 'Category 1',
        impact: 'High',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        recommendations: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    // Add more dummy data items if needed
];

function AuditFindings() {
    return (
        // Wrap the component in a dark theme using ThemeProvider
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
                {/* Map through dummy data to display audit findings */}
                {dummyData.map((data, index) => (
                    <Paper key={index} elevation={3} style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#333' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {/* Display the category */}
                                <Typography variant="h5" style={{ fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>
                                    {data.category}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Display the impact */}
                                <Typography variant="subtitle1">
                                    <span style={{ fontWeight: 800, fontSize: '18px' }}>Impact:</span> {data.impact}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Display the description */}
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 800, fontSize: '18px' }}>Description:</span> {data.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                {/* Display recommendations section */}
                                <Typography variant="h6" style={{ marginBottom: '8px' }}>
                                    Recommendations
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Display recommendations */}
                                <Typography variant="body1">
                                    {data.recommendations}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Container>
        </ThemeProvider>
    );
}

export default AuditFindings;
