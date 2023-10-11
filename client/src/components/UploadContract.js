// src/components/UploadContract.js
import React, { useState, useEffect } from 'react';
import './UploadContract.css';
import { Paper, Button, Typography, TextField, IconButton, ThemeProvider, createTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: { default: '#1b1e21' },
        text: { primary: '#fff' },
    },
});

export function UploadContract() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [downloadLink, setDownloadLink] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchUserDetails();
    }, []);    

    const [userName, setUserName] = useState('');   
    const [userID, setUserID] = useState();
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/users/me', {
                headers: {
                    'x-auth-token': token
                }
            });
            const userIDFetched = response.data.id;
            const userNameFetched = `${response.data.firstName} ${response.data.lastName}`;
            setUserName(userNameFetched);    // Store the fetched user's name
            setUserID(userIDFetched);     // Store the fetched user's ID
        } catch (err) {
            console.error("Failed to fetch user details", err);
        }
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('contract', file);
        
        try {
            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
        
            const data = response.data;
        
            if (data.success) {
                setMessage(data.message);
                setDownloadLink(`http://localhost:8080/slither_output/${data.filename}`);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error("Upload error:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage('An error occurred while uploading. Please try again.');
            }
        }
    };
    

    const handleAnalyseClick = async (filename) => {
        try {
            console.log({
                mdFilePath: filename,
                userName: userName,
                userID: userID,
                link: downloadLink        // Adding the downloadLink here
            });
            
            const response = await fetch(`http://localhost:8080/api/parseAndSave/save-report`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mdFilePath: filename,
                    userName: userName,      // Send the userName
                    userID: userID,          // Send the userID
                    link: downloadLink       // Send the downloadLink
                })
            });
    
            const data = await response.json();
    
            if (data.success) {
                navigate('/audit');
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('An error occurred while analysing. Please try again.');
        }
    };
    

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="upload-container">
                <Paper elevation={3} className="upload-section">
                    <Typography variant="h5" gutterBottom>Smart Contract Audit System</Typography>
                    <Typography variant="body1" gutterBottom>Identify potential vulnerabilities in your smart contract code with ease. Upload your contract and let our platform handle the rest.</Typography>
                    {message && <Typography color="error">{message}</Typography>}
                    <div className="upload-input">
                        <TextField type="file" accept=".sol" variant="outlined" fullWidth onChange={handleFileChange} InputProps={{ startAdornment: (<IconButton><CloudUploadIcon /></IconButton>) }} />
                        <Button variant="contained" size="large" style={{ backgroundColor: "#4682B4", color: "#ffffff" }} onClick={handleSubmit} disabled={!file}>Analyze</Button>
                        {downloadLink && (
                            <div style={{ marginTop: "20px" }}>
                                <Button variant="contained" color="primary" onClick={() => window.open(downloadLink, "_blank")}>Download Report</Button>
                                <Button variant="contained" color="secondary" onClick={() => handleAnalyseClick(downloadLink.split('/').pop())}>Analyse Report</Button>
                            </div>
                        )}
                    </div>
                </Paper>
            </div>
        </ThemeProvider>
    );
}
