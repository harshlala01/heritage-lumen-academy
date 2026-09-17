import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setSubscribed(true);
      setNewsEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid-top">
          {/* Col 1 */}
          <div className="footer-col">
            <Link to="/" className="brand-logo" style={{ marginBottom: '14px' }}>
              <div className="logo-crest-box">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="brand-text">
                <h2>HERITAGE LUMEN</h2>
                <p>Preparatory Academy</p>
              </div>
            </Link>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7 }}>
              Preparatory Academy. Nurturing scholars, athletes, artists, and ethical leaders since
              2003. Permanently affiliated with CISCE (WB 339).
            </p>
            <div className="social-row">
              <a href="#" className="social-link-btn" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link-btn" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="social-link-btn" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link-btn" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h5>About Us</h5>
            <ul className="footer-list">
              <li>
                <Link to="/about/foundation">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> School Foundation
                </Link>
              </li>
              <li>
                <Link to="/about/management">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> Management
                </Link>
              </li>
              <li>
                <Link to="/about/secretary-desk">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> Secretary's Desk
                </Link>
              </li>
              <li>
                <Link to="/about/principal-desk">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> Principal's Desk
                </Link>
              </li>
              <li>
                <Link to="/facilities">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> Campus Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul className="footer-list">
              <li>
                <Link to="/academics">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> Academic Curriculum
                </Link>
              </li>
              <li>
                <Link to="/activities">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> Curricular Activities
                </Link>
              </li>
              <li>
                <Link to="/gallery">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> Campus Gallery
                </Link>
              </li>
              <li>
                <Link to="/notice">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> Noticeboard & Circulars
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i> Contact Admissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col">
            <h5>Campus Newsletter</h5>
            <p style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
              Desk hours: Mon–Fri 10:30 am to 3:00 pm. Subscribe for weekly updates.
            </p>
            <form className="newsletter-bar" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Your email address"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                required
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>
            {subscribed && (
              <div className="newsletter-success-toast">
                <i className="fa-solid fa-circle-check"></i> Subscribed to the Heritage Lumen Gazette!
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>&copy; {new Date().getFullYear()} Heritage Lumen Preparatory Academy. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/about/foundation" style={{ color: '#64748B' }}>
              Privacy Policy
            </Link>
            <Link to="/about/foundation" style={{ color: '#64748B' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
