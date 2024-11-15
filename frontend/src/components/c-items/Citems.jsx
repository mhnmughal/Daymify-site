import React from 'react';
import './citem.css';

const Citems = React.memo((props) => {
  return (
    <div className="citem">
        <img 
          src={props.image} 
          alt="category" 
          loading="lazy" 
        />
        <p>{props.name}</p>
    </div>
  );
});

export default Citems;
