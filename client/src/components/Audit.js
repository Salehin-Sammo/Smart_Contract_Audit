//Jannatul Rakib Joy 103799644
import React from "react";
import { Typography, ThemeProvider, createTheme } from "@mui/material";
import AuditReport from "./AuditReport"; // Import the AuditReport component
import AuditFindings from "./AuditFindings"; // Import the AuditFindings component
import AuditResults from "./AuditResults"; // Import the AuditResults component
import AuditResultsTable from "./AuditResultsTable"; // Import the AuditResultsTable component

// Component-wide dark theme
export default function Audit() {
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

    return (
        // Wrap the component in a dark theme using ThemeProvider
        <ThemeProvider theme={darkTheme}>
            <div className="audit-container">
                {/* Title section */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Typography variant="h4" className="audit-title" style={{ fontWeight: 'bold' }}>
                        Audit Report
                    </Typography>
                </div>
                
                {/* Components */}
                <AuditResults /> {/* Render the AuditResults component */}
                <AuditResultsTable /> {/* Render the AuditResultsTable component */}
                <AuditReport /> {/* Render the AuditReport component */}
                <AuditFindings /> {/* Render the AuditFindings component */}
                {/* <AuditResultsPieChart /> Uncomment to render the AuditResultsPieChart component */}
            </div>
        </ThemeProvider>
    );
}
