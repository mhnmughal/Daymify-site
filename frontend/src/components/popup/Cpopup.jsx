import React from 'react';
import './popup.css';
import { TbRosetteDiscount } from "react-icons/tb";


const Cpopup = ({ data, onClose }) => {
  if (!data) return null;

  const handleButtonClick = () => {
    if (data.buttonLink) {
      window.open(data.buttonLink, '_blank');
    }
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose}>&times;</button>
        
        <div className="popup-content">
          
            <div className="popup-icon">
              <TbRosetteDiscount/>
            </div>
          
          {data.title && (
            <h2 className="popup-title">{data.title}</h2>
          )}
          
          {data.description && (
            <p className="popup-description">{data.description}</p>
          )}
          
          {data.buttonText && (
            <button 
              className="popup-button"
              onClick={handleButtonClick}
            >
              {data.buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cpopup;
