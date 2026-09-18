import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('initial'); // 'initial' -> 'drawing' -> 'complete' -> 'hidden'

  useEffect(() => {
    // Sequence timing
    const drawTimer = setTimeout(() => {
      setPhase('drawing');
    }, 150);

    const completeTimer = setTimeout(() => {
      setPhase('complete');
      if (onComplete) onComplete();
    }, 2100);

    const hiddenTimer = setTimeout(() => {
      setPhase('hidden');
    }, 2900);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(completeTimer);
      clearTimeout(hiddenTimer);
    };
  }, [onComplete]);

  if (phase === 'hidden') return null;

  return (
    <div className={`global-preloader ${phase === 'complete' ? 'preloader-slide-up' : ''}`}>
      <div className="preloader-content">
        {/* Animated Gold SVG Crest Border */}
        <div className="preloader-crest-wrapper">
          <svg className="preloader-svg-border" viewBox="0 0 160 160">
            <circle
              className={`preloader-svg-circle ${phase === 'drawing' || phase === 'complete' ? 'draw' : ''}`}
              cx="80"
              cy="80"
              r="74"
            />
          </svg>

          <div className="preloader-crest-inner">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
        </div>

        {/* Brand Name with Serif Fade In */}
        <div className="preloader-brand-text">
          <h1 className="preloader-title">HERITAGE LUMEN</h1>
          <div className="preloader-subtitle-wrap">
            <span className="preloader-line"></span>
            <p className="preloader-subtitle">PREPARATORY ACADEMY</p>
            <span className="preloader-line"></span>
          </div>
          <span className="preloader-motto">EST. 2003 • VERITAS ET EXCELLENTIA</span>
        </div>
      </div>
    </div>
  );
}
