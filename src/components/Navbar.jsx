import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar({ onOpenBanner }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setAboutDropdownOpen(false);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      <header className={`main-nav-header ${isScrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
        <div className="container nav-inner-container">
          {/* Left: Logo + "The Rabindra Bharati Heritage Day School" in serif */}
          <Link
            to="/"
            className="brand-logo-link"
            onClick={closeMobile}
          >
            <img
              src="/logo.jpg"
              alt="The Rabindra Bharati Heritage Day School"
              className="brand-logo-img"
            />
            <div className="brand-title-wrap">
              <span className="brand-main-title">THE RABINDRA BHARATI</span>
              <span className="brand-sub-title">HERITAGE DAY SCHOOL</span>
            </div>
          </Link>

          {/* Center: Nav links in elegant uppercase serif with animated gold underline */}
          <nav className="nav-desktop-menu" aria-label="Main Navigation">
            <ul className="nav-items-list">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link-serif ${isActive ? 'active' : ''}`}
                >
                  <span>Home</span>
                  <span className="nav-gold-underline"></span>
                </NavLink>
              </li>

              {/* About Us Dropdown */}
              <li
                className="nav-item nav-dropdown-parent"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`nav-link-serif nav-dropdown-btn ${isAboutActive ? 'active' : ''}`}
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  aria-expanded={aboutDropdownOpen}
                >
                  <span>About Us</span>
                  <i className="fa-solid fa-chevron-down nav-chevron-icon"></i>
                  <span className="nav-gold-underline"></span>
                </button>

                <div className={`nav-elegant-dropdown ${aboutDropdownOpen ? 'show' : ''}`}>
                  <Link
                    to="/about/foundation"
                    className={`nav-dropdown-item ${location.pathname === '/about/foundation' ? 'active' : ''}`}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <i className="fa-solid fa-landmark"></i>
                    <span>School Foundation</span>
                  </Link>
                  <Link
                    to="/about/management"
                    className={`nav-dropdown-item ${location.pathname === '/about/management' ? 'active' : ''}`}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <i className="fa-solid fa-users-gear"></i>
                    <span>Management</span>
                  </Link>
                  <Link
                    to="/about/secretary-desk"
                    className={`nav-dropdown-item ${location.pathname === '/about/secretary-desk' ? 'active' : ''}`}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <i className="fa-solid fa-pen-nib"></i>
                    <span>Secretary's Desk</span>
                  </Link>
                  <Link
                    to="/about/principal-desk"
                    className={`nav-dropdown-item ${location.pathname === '/about/principal-desk' ? 'active' : ''}`}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <i className="fa-solid fa-user-tie"></i>
                    <span>Principal's Desk</span>
                  </Link>
                </div>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/facilities"
                  className={({ isActive }) => `nav-link-serif ${isActive ? 'active' : ''}`}
                >
                  <span>Facilities</span>
                  <span className="nav-gold-underline"></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/academics"
                  className={({ isActive }) => `nav-link-serif ${isActive ? 'active' : ''}`}
                >
                  <span>Academics</span>
                  <span className="nav-gold-underline"></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/activities"
                  className={({ isActive }) => `nav-link-serif ${isActive ? 'active' : ''}`}
                >
                  <span>Activities</span>
                  <span className="nav-gold-underline"></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/gallery"
                  className={({ isActive }) => `nav-link-serif ${isActive ? 'active' : ''}`}
                >
                  <span>Gallery</span>
                  <span className="nav-gold-underline"></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/notice"
                  className={({ isActive }) => `nav-link-serif ${isActive ? 'active' : ''}`}
                >
                  <span>Notice</span>
                  <span className="nav-gold-underline"></span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `nav-link-serif ${isActive ? 'active' : ''}`}
                >
                  <span>Contact</span>
                  <span className="nav-gold-underline"></span>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right: Portal Login icon button + "APPLY ONLINE" button */}
          <div className="nav-actions-right">
            <Link
              to="/login"
              className="nav-portal-link"
              title="Portal Login"
              aria-label="Portal Login"
            >
              <i className="fa-solid fa-user-lock"></i>
            </Link>

            <Link
              to="/contact"
              className="btn-apply-online-gold"
              title="Apply for Admission"
            >
              <span className="btn-shine-sweep"></span>
              <span>APPLY ONLINE</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              className="mobile-menu-toggle-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-backdrop ${mobileOpen ? 'visible' : ''}`}
        onClick={closeMobile}
      />

      {/* Mobile Drawer */}
      <div className={`mobile-navigation-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-top">
          <div className="brand-logo-link">
            <img
              src="/logo.jpg"
              alt="The Rabindra Bharati Heritage Day School"
              className="brand-logo-img mobile"
            />
            <div className="brand-title-wrap">
              <span className="brand-main-title" style={{ fontSize: '0.95rem' }}>THE RABINDRA BHARATI</span>
              <span className="brand-sub-title" style={{ fontSize: '0.62rem' }}>HERITAGE DAY SCHOOL</span>
            </div>
          </div>
          <button
            className="mobile-close-btn"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <ul className="mobile-menu-list">
          <li>
            <NavLink to="/" onClick={closeMobile} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span>Home</span>
              <i className="fa-solid fa-chevron-right"></i>
            </NavLink>
          </li>

          <li>
            <button
              className={`mobile-menu-accordion ${isAboutActive ? 'active' : ''}`}
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
            >
              <span>About Us</span>
              <i className={`fa-solid ${mobileAboutOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>

            {mobileAboutOpen && (
              <div className="mobile-submenu">
                <NavLink to="/about/foundation" onClick={closeMobile}>School Foundation</NavLink>
                <NavLink to="/about/management" onClick={closeMobile}>Management</NavLink>
                <NavLink to="/about/secretary-desk" onClick={closeMobile}>Secretary's Desk</NavLink>
                <NavLink to="/about/principal-desk" onClick={closeMobile}>Principal's Desk</NavLink>
              </div>
            )}
          </li>

          <li>
            <NavLink to="/facilities" onClick={closeMobile}>
              <span>Facilities</span>
              <i className="fa-solid fa-chevron-right"></i>
            </NavLink>
          </li>

          <li>
            <NavLink to="/academics" onClick={closeMobile}>
              <span>Academics</span>
              <i className="fa-solid fa-chevron-right"></i>
            </NavLink>
          </li>

          <li>
            <NavLink to="/activities" onClick={closeMobile}>
              <span>Curricular Activities</span>
              <i className="fa-solid fa-chevron-right"></i>
            </NavLink>
          </li>

          <li>
            <NavLink to="/gallery" onClick={closeMobile}>
              <span>Gallery</span>
              <i className="fa-solid fa-chevron-right"></i>
            </NavLink>
          </li>

          <li>
            <NavLink to="/notice" onClick={closeMobile}>
              <span>Noticeboard</span>
              <i className="fa-solid fa-chevron-right"></i>
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" onClick={closeMobile}>
              <span>Contact & Admissions</span>
              <i className="fa-solid fa-chevron-right"></i>
            </NavLink>
          </li>
        </ul>

        <div className="mobile-drawer-footer">
          <Link
            to="/contact"
            className="btn-apply-online-gold"
            onClick={closeMobile}
            style={{ width: '100%', justifyContent: 'center' }}
            title="Apply for Admission"
          >
            <span className="btn-shine-sweep"></span>
            <span>APPLY ONLINE</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
          <div className="mobile-contact-pill">
            <a href="tel:+918001271960"><i className="fa-solid fa-phone"></i> +91 8001271960</a>
            <a href="mailto:therabindrabharatihds@gmail.com"><i className="fa-solid fa-envelope"></i> therabindrabharatihds@gmail.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
