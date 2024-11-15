import React from 'react';
import './loader.css';

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <div className="loading-animation">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="shadow-effect"></div>
                <div className="shadow-effect"></div>
                <div className="shadow-effect"></div>
            </div>
            <h2>Loading...</h2>
        </div>
    );
};

export default Loader;
