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
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fdfbf7',
      zIndex: 9999
    }}
  >
    <div 
      className="preloader-content"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <img 
        src="/school-banner.jpeg" 
        alt="The Rabindra Bharati Heritage Day School" 
        className="preloader-school-image"
        style={{ 
          maxWidth: '500px', 
          width: '100%', 
          height: 'auto' 
        }}
      />
    </div>
  </div>
);
}