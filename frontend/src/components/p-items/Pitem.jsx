import React, { memo, useCallback} from 'react';
import './pitem.css';
import { Link } from 'react-router-dom';

// Helper function to get currency symbol
const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'US': return '$';
    case 'EU': return '€';
    case 'GB': return '£';
    case 'AE': return 'د.إ';
    case 'PK': return '₨';
    default: return '$'; // Default currency sign
  }
};

const Pitem = (props) => {

  const mainImage = props.image && props.image[0];
  // Wrap scrollTo in a useCallback to avoid recreating it on each render
  const handleClick = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get the currency symbol dynamically
  const currencySymbol = getCurrencySymbol(props.countryCode);

  return (
    <Link to={`/product/${props.id}`} className="cl">
      <div className="pitem" onClick={handleClick}>
        <img src={mainImage || 'path/to/fallback-image.jpg'} alt={props.name} loading="lazy" />
        <p>{props.name}</p>
        <div className="prices">
          <span>{currencySymbol}{props.oldprice}</span>
          <span>{currencySymbol}{props.newprice}</span>
        </div>
      </div>
    </Link>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Pitem);
