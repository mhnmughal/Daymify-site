import React, { useContext } from 'react';
import './handbags.css';
import Pitem from '../p-items/Pitem';
import { Link } from 'react-router-dom';
import { Context } from '../../context API/Contextapi';

const Categorydetails = React.memo(({ data, heading, oneliner, category, banner }) => {
  const { countryCode } = useContext(Context);
  
  return (
    <div className="handbags">
      <div className="sub-handbags">
        <div className="headings">
          <h5>{heading}</h5>
          <p>{oneliner}</p>
          <Link to={`/${category}`} className="cl">
            <label>Discover</label>
          </Link>
        </div>
        <div className="banner">
          <img src={banner || 'path/to/fallback-banner.jpg'} alt="banner" loading="lazy" />
        </div>
        <div className="products">
          {data.map((item) => (
            <Pitem 
              key={item.id || item.name}
              id={item.id}
              image={item.images} 
              name={item.name} 
              oldprice={item.oldprice} 
              newprice={item.newprice}
              countryCode={countryCode}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Categorydetails;
