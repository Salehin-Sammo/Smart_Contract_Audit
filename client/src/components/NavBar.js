//Nazmus Salehin Sammo 103512692
import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AiOutlineAudit } from 'react-icons/ai';
import { BsCloudUpload } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io'; // Use IoMdTime for history icon
import { IoMdLogIn } from 'react-icons/io';
// eslint-disable-next-line 
import { RiLoginBoxLine } from 'react-icons/ri';
import { Assessment } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#52a0ba ',
    boxShadow: 'none',
    borderBottom: `2px solid ${theme.palette.divider}`,
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    marginLeft: theme.spacing(2),
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
}));

function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" className={classes.title}>
          Smart Contract Audit
        </Typography>
        
        {/* Dashboard Button */}
        <Button
          component={Link}
          to="/dashboard"
          className={classes.button}
          startIcon={<Assessment />}
        >
          Dashboard
        </Button>

        {/* Audit Report Button */}
        <Button
          component={Link}
          to="/audit-report"
          className={classes.button}
          startIcon={<AiOutlineAudit />}
        >
          Audit Report
        </Button>
        
        {/* Upload Button */}
        <Button
          component={Link}
          to="/upload"
          className={classes.button}
          startIcon={<BsCloudUpload />}
        >
          Upload
        </Button>
        
        {/* Previous Reports Button */}
        <Button
          component={Link}
          to="/previous-reports"
          className={classes.button}
          startIcon={<IoMdTime />}
        >
          Previous Reports
        </Button>
        
        {/* Login Button */}
        <Button
          component={Link}
          to="/login"
          className={classes.button}
          startIcon={<IoMdLogIn />}
        >
          Login
        </Button>
        
        {/* You can add more buttons for different actions */}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
