//Nazmus Salehin Sammo 103512692
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';

const SignUpPage = () => {
  // Define state to store form data
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNo: '',
    reason: '',
  });

  const [error, setError] = useState();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      console.log("Sending data:", data);
      const {data:res} = await axios.post(url, data);
      navigate('/login');
      console.log(res.message);
    }
    catch (error) {
      if(error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  // Function to handle input changes
  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value});
  };

  return (
    <div className="signup-page">
      <div className="background-image" />
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name Input */}
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={data.firstName}
              onChange={handleChange}
            />
          </div>
          {/* Last Name Input */}
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          {/* Contact No Input */}
          <div className="input-group">
            <label htmlFor="contactNo">Contact No</label>
            <input
              type="text"
              name="contactNo"
              id="contactNo"
              value={data.contactNo}
              onChange={handleChange}
            />
          </div>
          {/* Reason Input */}
          <div className="input-group">
            <label htmlFor="reason">Why do you want to use our service?</label>
            <textarea
              name="reason"
              id="reason"
              value={data.reason}
              onChange={handleChange}
            />
          </div>
          {/* Error Message */}
          {error && <div className="error_msg">{error}</div>}
          {/* Sign Up Button */}
          <button type="submit">Sign Up</button>
        </form>
        {/* Login Link */}
        <div className="log-in-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
