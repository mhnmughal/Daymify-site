import React, { useState, useEffect, useContext, useRef, useMemo, useCallback } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Context } from '../../context API/Contextapi';
import "./carousel.css";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const Bcarousel = () => {
  const { fetchCarousels } = useContext(Context);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const currentSlideRef = useRef(0); 
  const [_, forceRender] = useState(0); 
  const navigate = useNavigate();

  const memoizedSlides = useMemo(async () => {
    const fetchedSlides = await fetchCarousels();
    return fetchedSlides.filter(slide => slide.subcategory === null);
  }, [fetchCarousels]);

  useEffect(() => {
    memoizedSlides.then((fetchedSlides) => {
      setSlides(fetchedSlides);
      setLoading(false); // Set loading to false once data is loaded
    });
  }, [memoizedSlides]);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        currentSlideRef.current = (currentSlideRef.current + 1) % slides.length;
        forceRender(n => n + 1); 
      }, 4000);
      return () => clearInterval(interval); 
    }
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    currentSlideRef.current = (currentSlideRef.current + 1) % slides.length;
    forceRender(n => n + 1); 
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    currentSlideRef.current = (currentSlideRef.current - 1 + slides.length) % slides.length;
    forceRender(n => n + 1); 
  }, [slides.length]);

  if (loading) {
    return <Loader />;
  }

  if (!slides.length) {
    return <div className="carousel-error">No slides available</div>;
  }

  const current = slides[currentSlideRef.current];

  return (
    <div className="carousel-container">
      <div className="carousel">
        <IoIosArrowBack onClick={prevSlide} className="arrow arrow-left" />
        
        <div className="slide-container">
          {slides.map((item, idx) => (
            <div 
              key={idx} 
              className={`slide ${currentSlideRef.current === idx ? "slide-active" : "slide-hidden"}`}
            >
              <img 
                src={item.carousel} 
                alt={`Slide ${idx}`} 
                loading="lazy" 
              />
            </div>
          ))}
        </div>

        <div className="carousel-overlay">
          <h2 className="carousel-title">{current.title}</h2>
          <p className="carousel-description">{current.description}</p>
          <label
            className="carousel-button"
            onClick={() => navigate(current.linkto)}
          >
            {current.buttonText || "Discover"}
          </label>
        </div>

        <IoIosArrowForward onClick={nextSlide} className="arrow arrow-right" />

        <div className="indicators">
          {slides.map((_, idx) => (
            <label
              key={idx}
              className={`indicator ${currentSlideRef.current === idx ? "indicator-active" : ""}`}
              onClick={() => { currentSlideRef.current = idx; forceRender(n => n + 1); }}
              aria-label={`Go to slide ${idx + 1}`}
            ></label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bcarousel;
