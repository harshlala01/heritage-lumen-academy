import React, { useEffect, useRef, useState } from 'react';

/**
 * Reusable scroll-reveal wrapper matching the AboutSection narrative animation
 * (.about-heritage-left -> .about-heritage-left.revealed).
 */
export default function RevealTextBlock({ children, className = '', style = {} }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`about-heritage-left ${inView ? 'revealed' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
