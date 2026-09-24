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
    <div 
      className={`global-preloader ${phase === 'complete' ? 'preloader-slide-up' : ''}`}
    >
      <div className="preloader-content">
        <div className="preloader-crest-wrapper">
          <svg className="preloader-svg-border" viewBox="0 0 140 140">
            <circle
              className={`preloader-svg-circle ${phase === 'drawing' || phase === 'complete' ? 'draw' : ''}`}
              cx="70"
              cy="70"
              r="60"
            />
          </svg>
          <div className="preloader-crest-inner">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
        </div>
        <div className="preloader-title">THE RABINDRA BHARATI</div>
        <div className="preloader-subtitle-wrap">
          <span className="preloader-line"></span>
          <span className="preloader-subtitle">Heritage Day School</span>
          <span className="preloader-line"></span>
        </div>
        <div className="preloader-motto">ESTD 2003 • AFFILIATED TO CBSE, NEW DELHI</div>
      </div>
    </div>
  );
}