import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementBannerModal({ isOpen, onClose }) {
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

  // Randomize initial banner on mount/open
  useEffect(() => {
    if (isOpen) {
      setCurrentBannerIdx(Math.floor(Math.random() * 3));
    }
  }, [isOpen]);

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

  const banners = [
    // Banner 1: Board Results & Toppers (Matches user screenshot)
    {
      id: 1,
      tag: 'CBSE RESULTS 2025–2026',
      headline: 'THE RABINDRA BHARATI HERITAGE DAY SCHOOL',
      subline: 'AFFILIATED TO THE CBSE, NEW DELHI',
      title: 'Congratulations Class X & Class XII CBSE Toppers!',
      passBadge: 'PASS PERCENTAGE 100%',
      toppers: [
        {
          rank: 'ALL INDIA RANK 3RD',
          name: 'Alankrita Dutta',
          score: '99.4%',
          exam: 'Class X (CBSE)',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
        },
        {
          rank: 'ALL INDIA RANK 5TH',
          name: 'Tamoghno Saha',
          score: '98.6%',
          exam: 'Class XII (CBSE Science)',
          image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop'
        },
        {
          rank: 'ALL INDIA RANK 7TH',
          name: 'Shrestha Dey',
          score: '98.5%',
          exam: 'Class XII (CBSE Commerce)',
          image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop'
        }
      ],
      footerText: 'Admissions Open for Session 2025–2026. Limited seats across all divisions.',
      ctaText: 'Apply for Admission',
      ctaLink: '/contact'
    },

    // Banner 2: Admissions Announcement
    {
      id: 2,
      tag: 'ADMISSION ENQUIRY OPEN',
      headline: 'THE RABINDRA BHARATI HERITAGE DAY SCHOOL',
      subline: 'AFFILIATED TO THE CBSE, NEW DELHI',
      title: 'Admissions Open for Academic Year 2025–2026',
      passBadge: 'MERIT SCHOLARSHIPS AVAILABLE',
      toppers: [
        {
          rank: 'PRE-PRIMARY & PRIMARY',
          name: 'Early Years (Ages 3-5)',
          score: 'Grades I–V',
          exam: 'Play-way & Foundational Inquiry',
          image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=300&auto=format&fit=crop'
        },
        {
          rank: 'MIDDLE SCHOOL',
          name: 'Junior Academy',
          score: 'Grades VI–VIII',
          exam: 'STEM Labs & Practical Sciences',
          image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=300&auto=format&fit=crop'
        },
        {
          rank: 'SENIOR SECONDARY',
          name: 'Grades XI & XII (CBSE)',
          score: 'Science • Comm • Arts',
          exam: 'Pre-University & Competitive Track',
          image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=300&auto=format&fit=crop'
        }
      ],
      footerText: 'Office Hours: Monday to Friday 10:30 am to 3:00 pm. Visit school desk or apply online.',
      ctaText: 'Submit Admission Enquiry',
      ctaLink: '/contact'
    },

    // Banner 3: National Championship & Honors
    {
      id: 3,
      tag: 'NATIONAL HONORS 2025',
      headline: 'THE RABINDRA BHARATI HERITAGE DAY SCHOOL',
      subline: 'AFFILIATED TO THE CBSE, NEW DELHI',
      title: '1st Prize at National STEM & Robotics Conclave',
      passBadge: 'NATIONAL GOLD MEDAL',
      toppers: [
        {
          rank: 'ROBOTICS TRACK',
          name: 'Autonomous Rover Team',
          score: '1st Prize',
          exam: 'National STEM Conclave',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=300&auto=format&fit=crop'
        },
        {
          rank: 'HARVARD MUN 2025',
          name: 'Diplomatic Delegation',
          score: 'Best Delegation',
          exam: 'Model United Nations',
          image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=300&auto=format&fit=crop'
        },
        {
          rank: 'AQUATIC CHAMPIONSHIP',
          name: 'Varsity Swimming Squad',
          score: '14 Gold Medals',
          exam: 'State Interschool Meet',
          image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=300&auto=format&fit=crop'
        }
      ],
      footerText: 'Nurturing all-round excellence across academics, innovations, and sports since 2003.',
      ctaText: 'Explore Campus Life',
      ctaLink: '/facilities'
    }
  ];

  const banner = banners[currentBannerIdx];

  return (
    <div className="banner-modal-overlay" onClick={onClose}>
      <div className="banner-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Red Circular Close Button matching user screenshot */}
        <button className="banner-close-btn" onClick={onClose} aria-label="Close announcement banner">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="banner-inner-content">
          {/* Header Strip */}
          <div className="banner-header-strip">
            <span
              style={{
                background: 'var(--gold-primary)',
                color: 'var(--navy-dark)',
                padding: '3px 12px',
                borderRadius: '4px',
                fontWeight: 800,
                fontSize: '0.72rem',
                letterSpacing: '1px',
                display: 'inline-block',
                marginBottom: '8px'
              }}
            >
              {banner.tag}
            </span>
            <h2>{banner.headline}</h2>
            <p>{banner.subline}</p>
          </div>

          {/* Banner Title & Pass Percentage Badge */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '16px'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--navy-primary)',
                fontSize: '1.25rem',
                margin: 0
              }}
            >
              {banner.title}
            </h3>
            <span
              style={{
                background: '#b91c1c',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.8rem',
                padding: '5px 12px',
                borderRadius: '6px',
                letterSpacing: '0.5px'
              }}
            >
              {banner.passBadge}
            </span>
          </div>

          {/* 3 Toppers / Highlight Cards */}
          <div className="banner-toppers-grid">
            {banner.toppers.map((item, idx) => (
              <div className="topper-card" key={idx}>
                <span className="topper-rank-badge">{item.rank}</span>
                <img src={item.image} alt={item.name} className="topper-avatar" />
                <h4 className="topper-name">{item.name}</h4>
                <div className="topper-score">{item.score}</div>
                <div className="topper-board">{item.exam}</div>
              </div>
            ))}
          </div>

          {/* Footer Strip with Action */}
          <div className="banner-footer-strip">
            <div style={{ fontSize: '0.85rem', flexGrow: 1, maxWidth: '500px' }}>
              <i className="fa-solid fa-bullhorn" style={{ color: 'var(--gold-primary)', marginRight: '8px' }}></i>
              {banner.footerText}
            </div>
            <Link
              to={banner.ctaLink}
              onClick={onClose}
              className="btn-gold"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              {banner.ctaText} <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          {/* Switcher Dots */}
          <div className="banner-switcher-dots">
            {banners.map((_, idx) => (
              <button
                key={idx}
                className={`banner-switcher-dot ${currentBannerIdx === idx ? 'active' : ''}`}
                onClick={() => setCurrentBannerIdx(idx)}
                aria-label={`View banner ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
