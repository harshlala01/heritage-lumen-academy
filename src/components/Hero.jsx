import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const bgImgRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const statsWrapRef = useRef(null);

  // Background image with Indian school campus students walking
  const bgImageSrc = '/hero-bg.jpg';

  // Animated stat counters (0 to target, 1s duration starting at 2.6s)
  const [stats, setStats] = useState({
    passRate: 0,
    ratio: 0,
    years: 0,
    placement: 0
  });

  // ═══════════════════════════════════════════
  // 1. STATS COUNT-UP ANIMATION
  // ═══════════════════════════════════════════
  useEffect(() => {
    let animationFrame;
    let timeoutId;

    const startCounting = () => {
      let startTime = null;
      const duration = 1000; // 1s count-up duration

      const easeOutQuad = (t) => t * (2 - t);

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuad(progress);

        setStats({
          passRate: Math.round(eased * 100),
          ratio: Math.round(eased * 7),
          years: Math.round(eased * 22),
          placement: Math.round(eased * 100)
        });

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };

      animationFrame = requestAnimationFrame(step);
    };

    // Trigger counting at 2.6s timeline sync
    timeoutId = setTimeout(() => {
      startCounting();
    }, 2600);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  // ═══════════════════════════════════════════
  // 2. SCROLL PARALLAX HANDLER
  // ═══════════════════════════════════════════
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!heroRef.current) {
            ticking = false;
            return;
          }

          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          const heroHeight = heroRef.current.offsetHeight || window.innerHeight;

          if (scrollY <= heroHeight && window.innerWidth > 768) {
            // Background image moves DOWN at 0.5x scroll speed
            if (bgImgRef.current) {
              bgImgRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
            }

            // Text content moves UP at 0.3x scroll speed
            if (contentRef.current) {
              contentRef.current.style.transform = `translate3d(0, ${scrollY * -0.3}px, 0)`;
            }

            // Dark overlay gets slightly darker (0.72 -> 0.88)
            if (overlayRef.current) {
              const extraDarkness = Math.min(0.16, (scrollY / heroHeight) * 0.16);
              overlayRef.current.style.backgroundColor = `rgba(11, 27, 58, ${
                0.72 + extraDarkness
              })`;
            }

            // Stats bar fades out faster than text
            if (statsWrapRef.current) {
              const fadeRatio = Math.max(0, 1 - scrollY / (heroHeight * 0.45));
              statsWrapRef.current.style.opacity = fadeRatio.toString();
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="hero-section" id="hero">
      {/* 0.0s Background Image with Blur/Scale reveal + Ken Burns */}
      <div className="hero-bg-wrapper">
        <img
          ref={bgImgRef}
          src={bgImageSrc}
          alt="The Rabindra Bharati Heritage Day School Campus"
          className="hero-bg-image"
          loading="eager"
        />
      </div>

      {/* 0.5s Dark Navy Overlay Fade */}
      <div ref={overlayRef} className="hero-overlay" />

      {/* Hero Center Content */}
      <div ref={contentRef} className="hero-content">
        {/* 1.0s Gold Badge Appearance & Continuous Pulse */}
        <div className="hero-badge">
          <span className="badge-star">★</span>
          <span>ADMISSIONS OPEN FOR ACADEMIC YEAR 2026–2027</span>
        </div>

        {/* 1.3s Heading Word-by-Word Reveal */}
        <h1 className="hero-heading">
          <div className="hero-heading-line">
            <span className="hero-word hero-word-1">Nurturing</span>
            <span className="hero-word hero-word-2">Minds,</span>
          </div>
          <div className="hero-heading-line">
            <span className="hero-word hero-word-3">Cultivating</span>
            <span className="hero-gold-italic hero-word-4">Character</span>
          </div>
        </h1>

        {/* 1.8s Subtitle Fade-Up */}
        <p className="hero-subtitle">
          Affiliated to CBSE, New Delhi • Established on Unwavering Academic Rigor
          &amp; Ethical Foundation
        </p>

        {/* 2.2s Buttons Slide In with Gold Shimmer Hover */}
        <div className="hero-buttons-row">
          <Link to="/contact" className="btn-hero-gold">
            <span>APPLY FOR ADMISSION</span>
            <span className="btn-arrow">→</span>
          </Link>

          <Link to="/contact" className="btn-hero-outline">
            BOOK CAMPUS VISIT
          </Link>
        </div>
      </div>

      {/* 2.6s Stats Bar Fade-Up (Glassmorphism + Curved Top Docking) */}
      <div ref={statsWrapRef} className="hero-stats-wrapper">
        <div className="hero-stats-glass">
          {/* Stat 1: 100% */}
          <div className="hero-stat-card">
            <div className="hero-stat-num-box">
              <span>{stats.passRate}</span>
              <span className="stat-suffix">%</span>
            </div>
            <div className="hero-stat-label-text">
              BOARD PASS &amp; DISTINCTION
            </div>
          </div>

          {/* Stat 2: 7:1 */}
          <div className="hero-stat-card">
            <div className="hero-stat-num-box">
              <span>{stats.ratio}</span>
              <span className="stat-suffix">:1</span>
            </div>
            <div className="hero-stat-label-text">
              STUDENT-FACULTY RATIO
            </div>
          </div>

          {/* Stat 3: 22+ */}
          <div className="hero-stat-card">
            <div className="hero-stat-num-box">
              <span>{stats.years}</span>
              <span className="stat-suffix">+</span>
            </div>
            <div className="hero-stat-label-text">
              YEARS OF EXCELLENCE
            </div>
          </div>

          {/* Stat 4: 100% */}
          <div className="hero-stat-card">
            <div className="hero-stat-num-box">
              <span>{stats.placement}</span>
              <span className="stat-suffix">%</span>
            </div>
            <div className="hero-stat-label-text">
              PRE-UNIVERSITY PLACEMENT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
