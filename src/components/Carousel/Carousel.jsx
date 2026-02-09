// Carousel.jsx

import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.scss';

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={styles.container}>
      <div className={styles.carouselInner} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className={styles.carouselItem} key={index}>
            <img src={slide} alt={`Slide ${index}`} className={styles.image} />
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={prevSlide}>←</button>
      <button className={styles.button} onClick={nextSlide}>→</button>
    </div>
  );
};

export default Carousel;