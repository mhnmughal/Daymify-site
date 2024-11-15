import React from 'react';
import './description.css';

const Description = ({ description }) => {
    return (
        <div className="description">
            <div className="des-navigator">
                <div className="des-nav-box">Description</div>
            </div>
            <div className="des-description">
                {/* Use pre-wrap to preserve line breaks and whitespace */}
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Description;
