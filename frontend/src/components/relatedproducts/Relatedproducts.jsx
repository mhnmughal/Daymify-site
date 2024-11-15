import React, { useContext } from 'react';
import './relatedproducts.css';
import Pitem from '../p-items/Pitem.jsx';
import { Context } from '../../context API/Contextapi.jsx';
import { useParams } from 'react-router-dom';

const Relatedproducts = () => {
    const { allproducts, countryCode } = useContext(Context);
    const { id } = useParams();

    // Find the current product based on the URL id
    const currentProduct = allproducts.find((product) => product.id === Number(id));

    // If the current product is not found, or it doesn't have a category, return a message
    if (!currentProduct || !currentProduct.category) {
        return <div>No related products available</div>;
    }

    // Filter products to get only those in the same category, excluding the current product itself
    const relatedProducts = allproducts.filter((product) => 
        product.category === currentProduct.category && product.id !== Number(id)
    );

    // Early return if no related products found
    if (relatedProducts.length === 0) {
        return <div>No related products available</div>;
    }

    return (
        <div className="relatedproducts">
            <h1>Keep Exploring</h1>
            <hr />
            <div className="rp-items">
                {relatedProducts.map((product) => (
                    <Pitem 
                        key={product.id} 
                        id={product.id} 
                        name={product.name} 
                        image={product.images} 
                        newprice={product.newprice} 
                        oldprice={product.oldprice}
                        countryCode={countryCode}
                    />
                ))} 
            </div>
        </div>
    );
};

export default Relatedproducts;
