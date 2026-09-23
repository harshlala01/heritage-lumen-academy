import React, { useState, useEffect } from 'react';

export default function AutoImageCarousel({ images = [], alt = '', interval = 1000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="auto-carousel">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`${alt} ${index + 1}`}
          className={`auto-carousel-img ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}