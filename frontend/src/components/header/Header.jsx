import React from 'react';
import './header.css';
import Navbar from '../header/Navbar/Navbar.jsx';
import Navtop from './navtop/Navtop.jsx';


const Header = () => {
  return (
    <div className="header">
      <Navtop />
      <Navbar />
    </div>
  )
};

export default Header;
