//Jannatul Rakib Joy 103799644
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    makeStyles, // Import the makeStyles function
    Card,
    CardContent,
    Typography,
    Divider
} from '@material-ui/core';

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
    // Styling for the table container
    tableContainer: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: theme.spacing(4),
        width: '80%',
        margin: 'auto',
        marginBottom: theme.spacing(2),
    },
    // Styling for the table header
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    // Styling for the "Pass" status cell
    passStatus: {
        color: theme.palette.success.main,
        fontWeight: 'bold',
    },
    // Styling for the "Fail" status cell
    failStatus: {
        color: theme.palette.error.main,
        fontWeight: 'bold',
    },
    // Styling for the card container
    card: {
        width: '80%',
        margin: 'auto',
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        overflow: 'hidden'
    },
    // Styling for the card's content
    cardContent: {
        paddingBottom: theme.spacing(1),
        color: theme.palette.common.white, // Adjust for dark theme
    },
    // Styling for the divider between card content sections
    divider: {
        margin: theme.spacing(2, 0),
    },
    // Styling for table rows on hover
    rowStyling: {
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)', // adjusted for dark mode
        }
    }
}));

// Component code
function AuditResultsTable() {
    const classes = useStyles();
    const [selectedRow, setSelectedRow] = useState(null);

    const rows = [
        {
            issue: 'Issue 1',
            vulnerability: 'Reentrancy Vulnerability',
            status: 'Pass',
            description: 'Description for Issue 1.',
            remediation: 'Steps to fix Issue 1.',
            impact: 'High impact'
        },
        {
            issue: 'Issue 2',
            vulnerability: 'Integer Overflow/Underflow Vulnerability',
            status: 'Pass',
            description: 'Description for Issue 2.',
            remediation: 'Steps to fix Issue 2.',
            impact: 'Medium impact'
        },
        {
            issue: 'Issue 3',
            vulnerability: 'Unauthorized Access Vulnerability',
            status: 'Fail',
            description: 'Description for Issue 2.',
            remediation: 'Steps to fix Issue 2.',
            impact: 'Medium impact'
        },
        {
            issue: 'Issue 4',
            vulnerability: 'Denial of Service (DoS) Vulnerabilities',
            status: 'Pass',
            description: 'Description for Issue 4.',
            remediation: 'Steps to fix Issue 4.',
            impact: 'Medium impact'
        },
        {
            issue: 'Issue 5',
            vulnerability: 'Uninitialized Variables',
            status: 'Fail',
            description: 'Description for Issue 5.',
            remediation: 'Steps to fix Issue 5.',
            impact: 'Medium impact'
        }
    ];

    const handleRowClick = (row) => {
        setSelectedRow(row);
    };

    return (
        <div>
            {/* Table section */}
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table aria-label="security table">
                    <TableHead>
                        {/* Table header row */}
                        <TableRow className={classes.tableHeader}>
                            <TableCell style={{ color: 'white' }}>Issues</TableCell>
                            <TableCell style={{ color: 'white' }}>Vulnerabilities</TableCell>
                            <TableCell style={{ color: 'white' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Map through rows data to create table rows */}
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                onClick={() => handleRowClick(row)}
                                style={{ cursor: 'pointer' }}
                                className={classes.rowStyling}
                            >
                                {/* Display data in each cell */}
                                <TableCell component="th" scope="row" style={{ color: 'white' }}>
                                    {row.issue}
                                </TableCell>
                                <TableCell style={{ color: 'white' }}>{row.vulnerability}</TableCell>
                                <TableCell className={row.status === 'Pass' ? classes.passStatus : classes.failStatus}>
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    
            {/* Card section */}
            {selectedRow && (
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        {/* Display selected row's data */}
                        <Typography variant="h6" color="textPrimary">{selectedRow.issue}</Typography>
                        <Typography color="textSecondary">{selectedRow.vulnerability}</Typography>
                        <Typography style={{ color: selectedRow.status === 'Pass' ? 'green' : 'red' }}>
                            {selectedRow.status}
                        </Typography>
                        <Divider className={classes.divider} />
                        {/* Additional details about the selected row */}
                        <Typography variant="body2"><strong>Description:</strong> {selectedRow.description}</Typography>
                        <Typography variant="body2"><strong>Remediation:</strong> {selectedRow.remediation}</Typography>
                        <Typography variant="body2"><strong>Impact:</strong> {selectedRow.impact}</Typography>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}    

export default AuditResultsTable;
