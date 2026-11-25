import React from 'react';
import PageBanner from '../components/PageBanner';
import { Link } from 'react-router-dom';

export default function CurricularActivitiesPage() {
  const extraCurricularActivities = [
    {
      id: 1,
      title: 'Dance',
      tag: 'CULTURAL & PERFORMING ARTS',
      icon: 'fa-person-walking',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
      desc: 'Classical, folk, and contemporary creative choreography under professional mentors, developing poise, rhythmic discipline, and stage confidence.',
      highlights: ['Classical & Folk Styles', 'Annual Cultural Stage Performances', 'Rhythm & Body Coordination', 'Certified Dance Choreographers']
    },
    {
      id: 2,
      title: 'Drawing',
      tag: 'VISUAL ARTS & CREATIVITY',
      icon: 'fa-palette',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
      desc: 'Freehand sketching, watercolor painting, visual art composition, and canvas workshops cultivating deep artistic sensibility and creative thinking.',
      highlights: ['Oil Pastel & Water Color', 'Fine Art Sketching & Shading', 'Annual School Art Exhibitions', 'Olympiad & Contest Preparation']
    },
    {
      id: 3,
      title: 'Football',
      tag: 'SPORTS & ATHLETICS',
      icon: 'fa-futbol',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop',
      desc: 'Field tactical training, ball handling skills, speed conditioning, and tournament coaching fostering teamwork, stamina, and competitive sportsmanship.',
      highlights: ['Campus Football Ground', 'Tactical Drills & Passing Clinics', 'Inter-House League Tournaments', 'Endurance & Fitness Regimen']
    },
    {
      id: 4,
      title: 'Volley Ball',
      tag: 'SPORTS & ATHLETICS',
      icon: 'fa-volleyball',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop',
      desc: 'Regulation volleyball court training emphasizing rapid reflexes, defensive positioning, high-impact serving, and collaborative court communication.',
      highlights: ['Outdoor Regulation Court', 'Spiking & Serving Drills', 'Reflex & Agility Conditioning', 'House Championship Matches']
    },
    {
      id: 5,
      title: 'Cricket',
      tag: 'SPORTS & ATHLETICS',
      icon: 'fa-baseball-bat-ball',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
      desc: 'Net practice, specialized batting mechanics, bowling run-up discipline, and field placement strategy led by qualified cricket instructors.',
      highlights: ['Dedicated Practice Nets', 'Batting & Bowling Workshops', 'Video Technique Analysis', 'Annual Interschool Fixtures']
    }
  ];

  return (
    <div>
      <PageBanner
        title="Extra Curricular Activities"
        subtitle="Unleashing creativity, athleticism, leadership, and camaraderie beyond the traditional classroom."
        breadcrumbs={[{ label: 'Extra Curricular Activities' }]}
      />

      <section className="subpage-content-wrap">
        <div className="container">
          
          {/* 5 Activities Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {extraCurricularActivities.map((item) => (
              <div 
                key={item.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(11, 27, 61, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Image Cover */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(11, 27, 61, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: 'var(--gold-light)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.5px'
                    }}
                  >
                    {item.tag}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div 
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#FEF3C7',
                        color: '#92400E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.95rem'
                      }}
                    >
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--navy-primary)' }}>
                      {item.title}
                    </h3>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 16px', flex: 1 }}>
                    {item.desc}
                  </p>

                  {/* Highlights list */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {item.highlights.map((h, i) => (
                      <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa-solid fa-circle-check" style={{ color: '#059669', fontSize: '0.75rem' }}></i>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                      <i className="fa-solid fa-calendar-days"></i> Weekly Sessions
                    </span>
                    <Link 
                      to="/contact" 
                      style={{ 
                        fontSize: '0.82rem', 
                        color: 'var(--navy-primary)', 
                        fontWeight: 700, 
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Enquire <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
