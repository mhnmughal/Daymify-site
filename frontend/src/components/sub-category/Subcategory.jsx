import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import Categorydetails from '../handsbags/Categorydetails';
import { Context } from '../../context API/Contextapi';
import './subcategory.css';

const Subcategory = () => {
  const { fetchCarousels, fetchUserIP, countryCode } = useContext(Context);
  const [carousels, setCarousels] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseurl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  // Load and filter carousels on mount
  useEffect(() => {
    const loadCarousels = async () => {
      try {
        const fetchedCarousels = await fetchCarousels();
        const filteredCarousels = fetchedCarousels.filter(slide => slide.subcategory !== null);
        setCarousels(filteredCarousels);
      } catch (error) {
        console.error("Error fetching carousels:", error);
        setError("Failed to load carousels.");
      } finally {
        setLoading(false);
      }
    };
    loadCarousels();
  }, [fetchCarousels]);

  // Memoize filtered carousels to prevent unnecessary recalculations
  const filteredCarousels = useMemo(
    () => carousels.filter((carousel) => carousel.subcategory),
    [carousels]
  );

  // Load products based on category
  const loadCategoryProducts = useCallback(async (category) => {
    const sanitizedCategory = category.replace(/^\//, "");

    try {
      const response = await fetch(`${baseurl}/subcategorys?category=${sanitizedCategory}&countryCode=${countryCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCategoryProducts((prevProducts) => ({
          ...prevProducts,
          [sanitizedCategory]: data.products || []
        }));
      } else {
        console.error('Failed to fetch category products:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching category products:', error);
    }
  }, [baseurl, fetchUserIP]);

  // Fetch products for each carousel
  useEffect(() => {
    if (filteredCarousels.length > 0) {
      filteredCarousels.forEach((carousel) => {
        loadCategoryProducts(carousel.subcategory);
      });
    }
  }, [filteredCarousels, loadCategoryProducts]);

  if (loading) return <div>Loading carousels...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="subcategory">
      {filteredCarousels.length > 0 ? (
        filteredCarousels.map((carousel) => (
          <Categorydetails
            key={carousel._id}
            heading={carousel.title || 'No Title'}
            data={categoryProducts[carousel.subcategory.replace(/^\//, "")] || []}
            category={carousel.subcategory}
            oneliner={carousel.description || 'No Description'}
            banner={carousel.carousel}
          />
        ))
      ) : (
        <div className="no-subcategory-carousel">No subcategory carousels available.</div>
      )}
    </div>
  );
};

export default Subcategory;
