import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { contentImage, useContent } from '../hooks/useContent';

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const statsBarRef = useRef(null);
  const hasAnimated = useRef(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const banners = useContent('banners', [{
    id: 1,
    title: "Inspiring Intellect. Cultivating Character. Shaping Tomorrow's Leaders.",
    subtitle: 'A distinguished tradition of intellectual rigor, bespoke mentorship, and moral integrity—nurturing extraordinary scholars for global impact since 2003.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop'
  }]);
  const banner = banners[0];

  // Animated stat counters (0 to target)
  const [stats, setStats] = useState({
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
  });

  // Parallax mouse tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Entrance Animation Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-admissions-pill', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.2,
      })
      .from('.hero-cormorant-heading', {
        opacity: 0,
        y: 30,
        duration: 0.9,
      }, '-=0.4')
      .from('.hero-light-subtext', {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, '-=0.4')
      .from('.hero-action-buttons', {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, '-=0.4')
      .from('.hero-stat-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
      }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // IntersectionObserver for Stats Counting Animation (threshold 0.4, runs once)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let startTime = null;
          const duration = 2000; // 2 seconds

          // Ease-out cubic: 1 - Math.pow(1 - progress, 3)
          const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

          const animateNumbers = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);

            setStats({
              val1: Math.round(eased * 100),
              val2: Math.round(eased * 7),
              val3: Math.round(eased * 22),
              val4: Math.round(eased * 100),
            });

            if (progress < 1) {
              requestAnimationFrame(animateNumbers);
            }
          };

          requestAnimationFrame(animateNumbers);
        }
      },
      { threshold: 0.4 }
    );

    if (statsBarRef.current) {
      observer.observe(statsBarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating Golden Particles Canvas (Layer 3)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
      glow: Math.random() * 8 + 4,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(Date.now() * p.pulse) * 0.005;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, Math.min(0.9, p.opacity))})`;
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = 'rgba(229, 197, 110, 0.8)';
        ctx.fill();
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Magnetic button hover handler
  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMagneticLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate(0px, 0px)';
  };

  const headingWords = banner.title.split(' ').map((text, index, words) => ({
    text,
    highlight: index === words.length - 2
  }));

  return (
    <section ref={heroRef} className="cinematic-hero-section">
      {/* Background Video Layer */}
      <div className="hero-video-container">
        <video
          className="hero-video-element"
          autoPlay
          loop
          muted
          playsInline
          poster={contentImage(banner.image_path || banner.image)}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-hallway-4328-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-video-overlay-gradient"></div>
      </div>

      {/* 3 Parallax Layers */}
      {/* Layer 1: Architectural Gothic Pattern */}
      <div
        className="hero-parallax-layer layer-architecture"
        style={{
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -14}px, 0)`,
        }}
      />

      {/* Layer 2: Soft Volumetric Light Beam */}
      <div
        className="hero-parallax-layer layer-light-beam"
        style={{
          transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 20}px, 0)`,
        }}
      />

      {/* Layer 3: Floating Golden Particles Canvas */}
      <canvas ref={canvasRef} className="hero-particles-canvas" />

      {/* Hero Center Content */}
      <div className="container hero-content-wrapper">
        {/* Small badge: "ADMISSIONS OPEN FOR ACADEMIC YEAR 2025-2026" */}
        <div className="hero-admissions-pill">
          <span className="pill-dot"></span>
          <span className="pill-text">ADMISSIONS OPEN FOR ACADEMIC YEAR 2025-2026</span>
          <i className="fa-solid fa-sparkles pill-icon"></i>
        </div>

        {/* Main Heading letter/word reveal */}
        <h1 className="hero-cormorant-heading">
          {headingWords.map((word, wIdx) => (
            <span
              key={wIdx}
              className={`hero-word-wrap ${word.highlight ? 'gold-accent-word' : ''}`}
            >
              {word.text.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="hero-letter-reveal"
                  style={{ animationDelay: `${0.2 + wIdx * 0.09 + cIdx * 0.025}s` }}
                >
                  {char}
                </span>
              ))}
              <span className="hero-word-space">&nbsp;</span>
            </span>
          ))}
        </h1>

        {/* Subtext in light cream */}
        <p className="hero-light-subtext">
          {banner.subtitle}
        </p>

        {/* Action Button */}
        <div className="hero-action-buttons">
          <Link
            to="/contact"
            className="btn-hero-magnetic-gold"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            <span>Apply for Admission</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        {/* Hero Section ke Neeche Stats Bar with Counting Animation */}
        <div ref={statsBarRef} className="hero-stats-bar">
          {/* Stat 1: 100% — Board Pass & Distinction Rate */}
          <div className="hero-stat-item">
            <div className="hero-stat-number-wrap">
              <span className="hero-stat-value">{stats.val1}</span>
              <span className="hero-stat-suffix">%</span>
            </div>
            <div className="hero-stat-label">Board Pass & Distinction Rate</div>
          </div>

          <div className="hero-stat-divider"></div>

          {/* Stat 2: 7:1 — Student-Faculty Mentorship Ratio */}
          <div className="hero-stat-item">
            <div className="hero-stat-number-wrap">
              <span className="hero-stat-value">{stats.val2}</span>
              <span className="hero-stat-suffix">:1</span>
            </div>
            <div className="hero-stat-label">Student-Faculty Mentorship Ratio</div>
          </div>

          <div className="hero-stat-divider"></div>

          {/* Stat 3: 22+ — Years of Academic Excellence */}
          <div className="hero-stat-item">
            <div className="hero-stat-number-wrap">
              <span className="hero-stat-value">{stats.val3}</span>
              <span className="hero-stat-suffix">+</span>
            </div>
            <div className="hero-stat-label">Years of Academic Excellence</div>
          </div>

          <div className="hero-stat-divider"></div>

          {/* Stat 4: 100% — Premier University Placements */}
          <div className="hero-stat-item">
            <div className="hero-stat-number-wrap">
              <span className="hero-stat-value">{stats.val4}</span>
              <span className="hero-stat-suffix">%</span>
            </div>
            <div className="hero-stat-label">Premier University Placements</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator: Thin gold vertical line at bottom center with "SCROLL" text */}
      <div
        className="hero-scroll-indicator"
        onClick={() => {
          const aboutEl = document.getElementById('about');
          if (aboutEl) {
            if (window.lenis) window.lenis.scrollTo(aboutEl);
            else aboutEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="scroll-indicator-text">SCROLL</span>
        <div className="scroll-indicator-line">
          <div className="scroll-indicator-pip"></div>
        </div>
      </div>
    </section>
  );
}
