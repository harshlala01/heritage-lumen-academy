import React, { useState, useEffect } from 'react';

const BANNER_SRC = '/school-banner.jpeg';

export default function AnnouncementBannerModal({ isOpen, onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    const img = new Image();
    img.src = BANNER_SRC;
    if (img.complete && img.naturalWidth > 0) {
      setImgLoaded(true);
    } else {
      img.onload = () => {
        if (active) setImgLoaded(true);
      };
      img.onerror = () => {
        if (active) setImgLoaded(true);
      };
    }
    return () => {
      active = false;
    };
  }, [isOpen]);

  if (!isOpen || !imgLoaded) return null;

  return (
    <div 
      className="banner-modal-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-label="Announcement Banner"
    >
      <div 
        className="banner-modal-compact-wrapper" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Only clicking this cross button will close the banner */}
        <button 
          className="banner-compact-close-btn" 
          onClick={onClose} 
          aria-label="Close popup"
          title="Close banner"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Modal Banner Card */}
        <div className="banner-modal-compact-card">
          <div className="banner-compact-image-wrap">
            <img 
              src={BANNER_SRC} 
              alt="The Rabindra Bharati Heritage Day School - Congratulations 10th CBSE Board Achievers" 
              className="banner-compact-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
