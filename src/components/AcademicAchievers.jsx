import React, { useState } from 'react';

const ACHIEVERS_DATA = [
  {
    id: 1,
    name: 'ARCHISMAN BAR',
    class: 'Class X CBSE',
    score: '90.8%',
    rank: 'Top Performer',
    avatar: '/achievers/student_avatar_1.jpg?v=3',
    fullImg: '/achievers/student_1.jpg?v=3'
  },
  {
    id: 2,
    name: 'DEBAMIT BANDYOPADHYAY',
    class: 'Class X CBSE',
    score: '90.6%',
    rank: 'Distinction',
    avatar: '/achievers/student_avatar_2.jpg?v=3',
    fullImg: '/achievers/student_2.jpg?v=3'
  },
  {
    id: 3,
    name: 'SANKALPA BOSE',
    class: 'Class X CBSE',
    score: '90.4%',
    rank: 'Distinction',
    avatar: '/achievers/student_avatar_3.jpg?v=3',
    fullImg: '/achievers/student_3.jpg?v=3'
  },
  {
    id: 4,
    name: 'SUDARSHAN DAS',
    class: 'Class X CBSE',
    score: '90.0%',
    rank: 'High Honors',
    avatar: '/achievers/student_avatar_4.jpg?v=3',
    fullImg: '/achievers/student_4.jpg?v=3'
  },
  {
    id: 5,
    name: 'SOMBIT DEBNATH',
    class: 'Class X CBSE',
    score: '90.0%',
    rank: 'High Honors',
    avatar: '/achievers/student_avatar_5.jpg?v=3',
    fullImg: '/achievers/student_5.jpg?v=3'
  }
];

export default function AcademicAchievers() {
  const [showAll, setShowAll] = useState(false);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);

  // Initially show 4 cards; 5th card revealed when clicking "See More"
  const visibleAchievers = showAll ? ACHIEVERS_DATA : ACHIEVERS_DATA.slice(0, 4);

  return (
    <section className="achievers-section" id="academic-achievers">
      <div className="container">
        {/* Header matching Image 1 color & typography */}
        <div className="achievers-header">
          <div className="achievers-sub-badge">
            <i className="fa-solid fa-medal"></i> Academic Achievers
          </div>
          <h2 className="achievers-title">
            Our Academic Achievers
          </h2>
          <p className="achievers-desc">
            Celebrating the outstanding performance of our students in the recent Board Examinations.
          </p>
        </div>

        {/* 4 Cards Grid (5th revealed on See More) */}
        <div className="achievers-cards-grid">
          {visibleAchievers.map((student, index) => (
            <div
              key={student.id}
              className={`achiever-card achiever-card-anim-${(index % 4) + 1} ${
                index >= 4 ? 'achiever-card-revealed' : ''
              }`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {/* Card Top Accent Ring & Glow */}
              <div className="achiever-card-inner">
                {/* Floating Rank Pill */}
                <div className="achiever-rank-tag">
                  <i className="fa-solid fa-award"></i> {student.rank}
                </div>

                {/* Animated Avatar Circle Frame */}
                <div className="achiever-avatar-wrap">
                  <div className="achiever-avatar-ring"></div>
                  <div className="achiever-avatar-pulse"></div>
                  <div className="achiever-avatar-img-box">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      onError={(e) => {
                        e.currentTarget.src = student.fullImg;
                      }}
                      className="achiever-avatar-img"
                    />
                  </div>
                </div>

                {/* Student Details */}
                <div className="achiever-info">
                  <h3 className="achiever-name">{student.name}</h3>
                  <div className="achiever-class">{student.class}</div>
                  
                  {/* Highlighted Percentage Score Badge */}
                  <div className="achiever-score-badge">
                    <span className="achiever-score-value">{student.score}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More / Show Less Button */}
        <div className="achievers-action-wrap">
          <button
            type="button"
            className="btn-achievers-see-more"
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
          >
            <span>{showAll ? 'Show Less' : 'See More (5th Achiever)'}</span>
            <i className={`fa-solid ${showAll ? 'fa-chevron-up' : 'fa-arrow-right'} btn-icon-arrow`}></i>
          </button>

          <button
            type="button"
            className="btn-achievers-banner-view"
            onClick={() => setBannerModalOpen(true)}
            title="View full congratulations board topper banner"
          >
            <i className="fa-solid fa-image"></i> View Official Toppers Banner
          </button>
        </div>

        {/* Full Banner Modal */}
        {bannerModalOpen && (
          <div
            className="achievers-banner-modal-overlay"
            onClick={() => setBannerModalOpen(false)}
          >
            <div
              className="achievers-banner-modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="achievers-modal-header">
                <h3>The Rabindra Bharati Heritage Day School - Board Toppers</h3>
                <button
                  type="button"
                  className="achievers-modal-close-btn"
                  onClick={() => setBannerModalOpen(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="achievers-modal-img-wrap">
                <img
                  src="/achievers/board_toppers_banner.jpg"
                  alt="Congratulations To all who excelled 10th CBSE Board"
                  className="achievers-modal-img"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
