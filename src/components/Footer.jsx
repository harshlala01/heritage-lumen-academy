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
    <footer className="footer-foundation-section">
      {/* Subtle Gold Line at Top */}
      <div className="footer-gold-top-border"></div>

      <div className="container">
        <div className="footer-grid-top">
          {/* Col 1: Brand Foundation */}
          <div className="footer-col">
            <Link to="/" className="brand-logo-footer" style={{ marginBottom: '16px' }}>
              <div className="logo-crest-box-gold">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="brand-text-cream">
                <h2>HERITAGE LUMEN</h2>
                <p>Preparatory Academy • Est. 1912</p>
              </div>
            </Link>
            <p className="footer-desc-text">
              Inspiring Intellect. Cultivating Character. Nurturing scholars, artists, scientists, and ethical leaders under CISCE affiliation (WB 339).
            </p>
            
            {/* Social icons: Gold circles with navy icons. On hover rotate 360 */}
            <div className="social-row-gold">
              <a href="#" className="social-gold-circle" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="social-gold-circle" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="social-gold-circle" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-gold-circle" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Institutional */}
          <div className="footer-col">
            <h5 className="footer-heading-gold">About Us</h5>
            <ul className="footer-links-list">
              <li>
                <Link to="/about/foundation" className="footer-animated-link">
                  School Foundation
                </Link>
              </li>
              <li>
                <Link to="/about/management" className="footer-animated-link">
                  Management &amp; Board
                </Link>
              </li>
              <li>
                <Link to="/about/secretary-desk" className="footer-animated-link">
                  Secretary's Desk
                </Link>
              </li>
              <li>
                <Link to="/about/principal-desk" className="footer-animated-link">
                  Principal's Desk (The Voice)
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="footer-animated-link">
                  Campus Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Admissions */}
          <div className="footer-col">
            <h5 className="footer-heading-gold">Quick Links</h5>
            <ul className="footer-links-list">
              <li>
                <Link to="/academics" className="footer-animated-link">
                  Academic Curriculum
                </Link>
              </li>
              <li>
                <Link to="/activities" className="footer-animated-link">
                  Extra Curricular Activities
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="footer-animated-link">
                  Campus Moments &amp; Gallery
                </Link>
              </li>
              <li>
                <Link to="/notice" className="footer-animated-link">
                  Noticeboard &amp; Circulars
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-animated-link">
                  Admissions &amp; Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-col">
            <h5 className="footer-heading-gold">Campus Gazette</h5>
            <p className="footer-desc-text" style={{ marginBottom: '14px' }}>
              Subscribe for institutional updates, academic honors, and convocation notices.
            </p>
            <form className="newsletter-cream-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Your email address"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                required
                className="newsletter-cream-input"
              />
              <button type="submit" className="newsletter-gold-btn" aria-label="Subscribe">
                <span className="newsletter-btn-arrow">→</span>
              </button>
            </form>
            {subscribed && (
              <div className="newsletter-success-toast">
                <i className="fa-solid fa-circle-check"></i> Subscribed to the Heritage Lumen Gazette!
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-foundation">
          <p>&copy; {new Date().getFullYear()} Heritage Lumen Preparatory Academy. All Rights Reserved.</p>
          <div className="footer-bottom-legal-links">
            <Link to="/about/foundation" className="footer-legal-link">
              Privacy Policy
            </Link>
            <Link to="/about/foundation" className="footer-legal-link">
              Terms of Academic Covenant
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

