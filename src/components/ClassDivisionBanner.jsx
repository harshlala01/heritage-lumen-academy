import React from 'react';
import { Link } from 'react-router-dom';

export default function ClassDivisionBanner() {
  const divisions = [
    {
      id: 1,
      title: 'PRE- PRIMARY',
      grades: 'NURSERY, KG-I, KG-II',
      link: '/academics'
    },
    {
      id: 2,
      title: 'PRIMARY',
      grades: 'CLASS I, II, III, IV, V',
      link: '/academics'
    },
    {
      id: 3,
      title: 'UPPER PRIMARY',
      grades: 'CLASS VI, VII, VIII',
      link: '/academics'
    },
    {
      id: 4,
      title: 'SECONDARY',
      grades: 'CLASS IX AND X (ICSE)',
      link: '/academics'
    },
    {
      id: 5,
      title: 'SENIOR SECONDARY',
      grades: 'CLASS XI AND XII (ISC)',
      link: '/academics'
    }
  ];

  return (
    <section className="class-division-banner-section">
      <div className="container">
        {/* Header */}
        <div className="class-division-sub">Become a Student</div>
        <h2 className="class-division-title">CLASS DIVISION</h2>

        {/* 5-Column Segmented Bar matching screenshot */}
        <div className="class-division-bar">
          {divisions.map((div) => (
            <Link
              to={div.link}
              className="class-div-col"
              key={div.id}
              title={`Explore ${div.title} Curriculum`}
            >
              <h3>{div.title}</h3>
              <p>{div.grades}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
