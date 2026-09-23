import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
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
                <h2>THE RABINDRA BHARATI</h2>
                <p>Heritage Day School • CBSE Affiliated</p>
              </div>
            </Link>
            <p className="footer-desc-text">
              Inspiring Intellect. Cultivating Character. Nurturing scholars, artists, scientists, and ethical leaders under CBSE affiliation.
            </p>
            
            {/* Social icons: Gold circles with navy icons */}
            <div className="social-row-gold">
              <a href="#" className="social-gold-circle" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="social-gold-circle" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
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

          {/* Col 4: Locate on Map */}
          <div className="footer-col">
            <h5 className="footer-heading-gold">Locate on Map</h5>
            <div className="footer-map-wrapper">
              <a
                href="https://maps.google.com/?q=Heritage+Day+School+-+Nagarukhra%2C+607%2FE%2C+Nagarukhra+-+Jagulia+Rd%2C+West%2C+Barasat%2C+Nagarukhra%2C+West+Bengal+741257"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map-open-badge"
                title="Open location in Google Maps"
              >
                <span>Open in Maps</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
              <iframe
                title="Academy Location on Map"
                src="https://maps.google.com/maps?q=Heritage+Day+School+-+Nagarukhra%2C+607%2FE%2C+Nagarukhra+-+Jagulia+Rd%2C+West%2C+Barasat%2C+Nagarukhra%2C+West+Bengal+741257&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="footer-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="footer-map-address">
              <i className="fa-solid fa-location-dot"></i>
              <span>Heritage Day School - Nagarukhra, 607/E, Nagarukhra - Jagulia Rd, West, Barasat, Nagarukhra, West Bengal 741257</span>
            </p>
            <p className="footer-map-address" style={{ marginTop: '8px' }}>
              <i className="fa-solid fa-phone" style={{ color: 'var(--gold-primary)' }}></i>
              <a href="tel:+918001271960" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8001271960</a>
            </p>
            <p className="footer-map-address" style={{ marginTop: '8px' }}>
              <i className="fa-solid fa-envelope" style={{ color: 'var(--gold-primary)' }}></i>
              <a href="mailto:therabindrabharatihds@gmail.com" style={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-all' }}>therabindrabharatihds@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-foundation">
          <p>&copy; {new Date().getFullYear()} The Rabindra Bharati Heritage Day School. All Rights Reserved.</p>
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

