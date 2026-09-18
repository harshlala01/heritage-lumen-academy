import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const percentage = Math.min(100, Math.max(0, (scrollTop / height) * 100));
        setScrollWidth(percentage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="global-scroll-progress-container" aria-hidden="true">
      <div
        className="global-scroll-progress-bar"
        style={{ width: `${scrollWidth}%` }}
      />
    </div>
  );
}
