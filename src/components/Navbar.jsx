import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar({ onOpenBanner }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setAboutDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const isAboutActive = location.pathname.startsWith('/about');

  return (
    <>
      <header className="main-nav">
        <div className="container nav-inner">
          {/* Brand Crest & Title */}
          <Link
            to="/"
            className="brand-logo"
            onClick={() => {
              closeMobile();
              if (onOpenBanner) onOpenBanner();
            }}
          >
            <div className="logo-crest-box">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="brand-text">
              <h2>HERITAGE LUMEN</h2>
              <p>Preparatory Academy</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links-list">
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  if (onOpenBanner) onOpenBanner();
                }}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Home
              </NavLink>
            </li>

            {/* About Us Dropdown */}
            <li
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                className={`nav-dropdown-toggle ${isAboutActive ? 'active' : ''}`}
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                aria-expanded={aboutDropdownOpen}
              >
                About Us <i className="fa-solid fa-chevron-down"></i>
              </button>

              <div className={`nav-dropdown-menu ${aboutDropdownOpen ? 'show' : ''}`}>
                <Link
                  to="/about/foundation"
                  className={`nav-dropdown-item ${location.pathname === '/about/foundation' ? 'active' : ''}`}
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  <i className="fa-solid fa-landmark" style={{ color: 'var(--gold-dark)', width: '16px' }}></i>
                  School Foundation
                </Link>
                <Link
                  to="/about/management"
                  className={`nav-dropdown-item ${location.pathname === '/about/management' ? 'active' : ''}`}
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  <i className="fa-solid fa-users-gear" style={{ color: 'var(--gold-dark)', width: '16px' }}></i>
                  Management
                </Link>
                <Link
                  to="/about/secretary-desk"
                  className={`nav-dropdown-item ${location.pathname === '/about/secretary-desk' ? 'active' : ''}`}
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  <i className="fa-solid fa-pen-nib" style={{ color: 'var(--gold-dark)', width: '16px' }}></i>
                  Secretary's Desk
                </Link>
                <Link
                  to="/about/principal-desk"
                  className={`nav-dropdown-item ${location.pathname === '/about/principal-desk' ? 'active' : ''}`}
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  <i className="fa-solid fa-user-tie" style={{ color: 'var(--gold-dark)', width: '16px' }}></i>
                  Principal's Desk
                </Link>
              </div>
            </li>

            <li>
              <NavLink to="/facilities" className={({ isActive }) => (isActive ? 'active' : '')}>
                Facilities
              </NavLink>
            </li>

            <li>
              <NavLink to="/academics" className={({ isActive }) => (isActive ? 'active' : '')}>
                Academics
              </NavLink>
            </li>

            <li>
              <NavLink to="/activities" className={({ isActive }) => (isActive ? 'active' : '')}>
                Curricular Activities
              </NavLink>
            </li>

            <li>
              <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'active' : '')}>
                Gallery
              </NavLink>
            </li>

            <li>
              <NavLink to="/notice" className={({ isActive }) => (isActive ? 'active' : '')}>
                Notice
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <div
        className={`mobile-drawer-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={closeMobile}
      />

      {/* Mobile Slide-out Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div>
          <div className="mobile-drawer-header">
            <div className="brand-logo">
              <div className="logo-crest-box" style={{ width: '36px', height: '36px', fontSize: '1.1rem' }}>
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="brand-text">
                <h2 style={{ fontSize: '1.05rem' }}>HERITAGE LUMEN</h2>
                <p style={{ fontSize: '0.58rem' }}>Preparatory Academy</p>
              </div>
            </div>
            <button
              className="mobile-drawer-close"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <ul className="mobile-nav-links">
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  closeMobile();
                  if (onOpenBanner) onOpenBanner();
                }}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <span>Home</span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
              </NavLink>
            </li>

            {/* Mobile Accordion for About Us */}
            <li>
              <button
                className={`mobile-dropdown-header ${isAboutActive ? 'active' : ''}`}
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              >
                <span>About Us</span>
                <i
                  className={`fa-solid ${mobileAboutOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                  style={{ fontSize: '0.75rem' }}
                ></i>
              </button>

              {mobileAboutOpen && (
                <div className="mobile-dropdown-list">
                  <NavLink to="/about/foundation" onClick={closeMobile}>
                    School Foundation
                  </NavLink>
                  <NavLink to="/about/management" onClick={closeMobile}>
                    Management
                  </NavLink>
                  <NavLink to="/about/secretary-desk" onClick={closeMobile}>
                    Secretary's Desk
                  </NavLink>
                  <NavLink to="/about/principal-desk" onClick={closeMobile}>
                    Principal's Desk
                  </NavLink>
                </div>
              )}
            </li>

            <li>
              <NavLink to="/facilities" onClick={closeMobile} className={({ isActive }) => (isActive ? 'active' : '')}>
                <span>Facilities</span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
              </NavLink>
            </li>

            <li>
              <NavLink to="/academics" onClick={closeMobile} className={({ isActive }) => (isActive ? 'active' : '')}>
                <span>Academics</span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
              </NavLink>
            </li>

            <li>
              <NavLink to="/activities" onClick={closeMobile} className={({ isActive }) => (isActive ? 'active' : '')}>
                <span>Curricular Activities</span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
              </NavLink>
            </li>

            <li>
              <NavLink to="/gallery" onClick={closeMobile} className={({ isActive }) => (isActive ? 'active' : '')}>
                <span>Gallery</span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
              </NavLink>
            </li>

            <li>
              <NavLink to="/notice" onClick={closeMobile} className={({ isActive }) => (isActive ? 'active' : '')}>
                <span>Notice</span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" onClick={closeMobile} className={({ isActive }) => (isActive ? 'active' : '')}>
                <span>Contact</span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <div className="mobile-drawer-actions">
            <Link to="/contact" className="btn-gold" onClick={closeMobile}>
              Apply Online <i className="fa-solid fa-arrow-right"></i>
            </Link>
            <Link to="/contact" className="btn-outline-white" onClick={closeMobile}>
              Schedule Campus Visit
            </Link>
          </div>

          <div className="mobile-drawer-contact">
            <a href="tel:+15552345678">
              <i className="fa-solid fa-phone"></i> +1 (555) 234-5678
            </a>
            <a href="mailto:admissions@heritagelumen.edu">
              <i className="fa-solid fa-envelope"></i> admissions@heritagelumen.edu
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
