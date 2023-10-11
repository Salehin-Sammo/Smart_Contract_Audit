import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the App component

// Render the App component within the React.StrictMode wrapper
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Render within the root element in your HTML
);
