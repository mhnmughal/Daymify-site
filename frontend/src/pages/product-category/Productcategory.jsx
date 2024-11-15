import React, { useState, useEffect, useContext } from 'react';
import './productcategory.css';
import Pitem from '../../components/p-items/Pitem';
import {Context} from '../../context API/Contextapi'

const Productcategory = (props) => {
    const { allproducts } = useContext(Context);

    const [sortOrder, setSortOrder] = useState(''); // State for sorting (empty by default)

    // Filter bags based on selected category
    const filteredBags = allproducts.filter(item => item.category === props.category);
    // Get the count of filtered items
    const quantity = filteredBags.length;

    // Sort the filtered bags based on sortOrder (high to low, or low to high)
    const sortedBags = [...filteredBags].sort((a, b) => {
        if (sortOrder === 'low-to-high') {
            return a.newprice - b.newprice; // Sort by low price
        } else if (sortOrder === 'high-to-low') {
            return b.newprice - a.newprice; // Sort by high price
        } else {
            return 0; // No sorting
        }
    });

    return (
        <div className="shop-catagory">
            <div className="shopcatagory-indexsort">
                <p className='quantity'>
                    {props.category} <span>({quantity})</span>
                </p>
                <div className="shopcatagory-sort">
                    Sort by
                    <select
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                        className="sort-dropdown"
                    >
                        <option value="">Relevance</option>
                        <option value="low-to-high">Lowest Price</option>
                        <option value="high-to-low">Highest Price</option>
                    </select>
                </div>
            </div>
            <div className="shopcatagory-products">
                {sortedBags.map((item) => (
                    <Pitem 
                        key={item.id}
                        id={item.id} 
                        image={item.images} 
                        name={item.name} 
                        newprice={item.newprice} 
                        oldprice={item.oldprice}
                        countryCode={item.countryCode}
                    />
                ))}
            </div>
            <div className="loadmore">
                Explore More
            </div>
        </div>
    );
};

export default Productcategory;
