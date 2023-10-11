//Group 2-16
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import { UploadContract } from './components/UploadContract';
import PreviousReports from './components/PreviousReports';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Audit from './components/Audit';
import AuditPage from './components/AuditPage';

// Create a dark theme using Material-UI's createTheme function
const darkTheme = createTheme({
    palette: {
        type: 'dark',
    },
});

// Main App component
export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            {/* Define routes and their corresponding components */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadContract />} />
            <Route path="/audit-report" element={<Audit />} />
            <Route path="/previous-reports" element={<PreviousReports />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/" element={<Dashboard />} /> {/* Default route */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
