import React from 'react';
import './unauthorized.css';
import { FaBan } from 'react-icons/fa'; // Importing an icon from react-icons

const Unauthorized = () => {
  const handleRedirect = () => {
    // Redirect to home page
    window.location.href = '/'; // Change this to your home page route
  };

  return (
    <div className="unauthorized-container">
      <FaBan className="unauthorized-icon" />
      <h2>Unauthorized Access</h2>
      <h3>You do not have permission to view this page.</h3>
      <button className="redirect-button" onClick={handleRedirect}>
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;
