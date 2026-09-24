import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementBannerModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="banner-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Announcement Banner">
      <div className="banner-modal-card image-banner-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="banner-close-btn" 
          onClick={onClose} 
          aria-label="Close popup"
          title="Close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Modal Content / Image Banner */}
        <div className="banner-image-container">
          <img 
            src="/school-banner.jpeg" 
            alt="The Rabindra Bharati Heritage Day School - Congratulations Class X CBSE Board Achievers" 
            className="school-popup-banner-img"
          />
        </div>

        {/* Bottom Action Footer */}
        <div className="banner-modal-footer">
          <div className="banner-footer-info">
            <span className="banner-badge-live">
              <span className="live-dot"></span> CBSE 10th Board Results & Admissions 2026–27
            </span>
          </div>
          <div className="banner-footer-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="banner-dismiss-btn"
            >
              Close
            </button>
            <Link
              to="/contact"
              onClick={onClose}
              className="banner-apply-btn"
            >
              <i className="fa-solid fa-paper-plane"></i> Apply for Admission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

