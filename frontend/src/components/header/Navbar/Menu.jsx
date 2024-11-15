import React, { useState, useCallback } from 'react';
import './menu.css';
import { RxCross2 } from 'react-icons/rx';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // useCallback to memoize the toggle function
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="menu">
      <div className="close">
        <h5>Menu</h5>
        <RxCross2 onClick={toggleDropdown} style={{ cursor: 'pointer' }} /> {/* Added click handler */}
      </div>
      <div className={`dropdown ${isOpen ? 'show' : ''}`}>
        <button 
          className="dropbtn" 
          onClick={toggleDropdown} 
          aria-expanded={isOpen} // Accessibility attribute
          aria-controls="dropdown-content" // Accessibility attribute
        >
          <span className="icon">{isOpen ? '-' : '+'}</span> Dropdown
        </button>
        <div id="dropdown-content" className="dropdown-content">
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
          <a href="#">Option 3</a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
