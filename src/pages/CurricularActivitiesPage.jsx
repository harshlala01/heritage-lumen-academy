import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import { Link } from 'react-router-dom';

export default function CurricularActivitiesPage() {
  const [activeCategory, setActiveCategory] = useState('clubs');

  const clubs = [
    {
      title: 'Turing Robotics & AI Conclave',
      icon: 'fa-robot',
      desc: 'Hands-on training in autonomous robotics, microcontrollers (Arduino/Raspberry Pi), computer vision, and national conclaves.'
    },
    {
      title: 'Heritage Model United Nations (HMUN)',
      icon: 'fa-earth-americas',
      desc: 'Diplomacy, resolution drafting, parliamentary procedure, and participation in Harvard, Ivy, and national school MUNs.'
    },
    {
      title: 'Socratic Debating & Oratory Society',
      icon: 'fa-microphone',
      desc: 'Developing persuasive eloquence, cross-examination skills, and critical rebuttals in British Parliamentary style.'
    },
    {
      title: 'Aryabhata Mathematics & Coding Guild',
      icon: 'fa-code',
      desc: 'Algorithmic thinking, competitive programming in Python & Java, and preparation for national mathematical Olympiads.'
    },
    {
      title: 'Gaia Eco & Sustainability Collective',
      icon: 'fa-seedling',
      desc: 'Campus organic gardening, biodiversity surveys, solar energy monitoring, and tree plantation drives.'
    },
    {
      title: 'Aperture Lens & Cinematography Society',
      icon: 'fa-camera',
      desc: 'Visual composition, DSLR cinematography, documentary production, and digital darkroom photo editing.'
    }
  ];

  const sports = [
    {
      title: 'Championship Aquatic Sports',
      icon: 'fa-person-swimming',
      desc: 'State-certified coaches conducting competitive swimming, stroke mechanics, life-saving drills, and water polo.'
    },
    {
      title: 'Lumen River Crew & Rowing',
      icon: 'fa-ship',
      desc: 'Historic sculling and rowing tradition with professional boat sheds, coxswain tactics, and regattas.'
    },
    {
      title: 'Varsity Football & Futsal',
      icon: 'fa-futbol',
      desc: 'FIFA-approved astro-turf ground with specialized tactical drills and inter-school championship leagues.'
    },
    {
      title: 'Lawn Tennis & Badminton',
      icon: 'fa-table-tennis-paddle-ball',
      desc: 'Four regulation hard courts with floodlights for evening training, tournament conditioning, and racket clinics.'
    },
    {
      title: 'Martial Arts & Self-Defense',
      icon: 'fa-hand-fist',
      desc: 'Black-belt instruction in Taekwondo and Karate focusing on mental discipline, stamina, and self-defense agility.'
    },
    {
      title: 'Cricket Academy',
      icon: 'fa-baseball-bat-ball',
      desc: 'Turf and concrete bowling nets with bowling machines, video-assisted biomechanics, and annual fixtures.'
    }
  ];

  const houses = [
    {
      name: 'Tagore House',
      color: '#E53E3E',
      motto: 'Knowledge is Freedom',
      mascot: 'Red Phoenix',
      desc: 'Embodying literature, artistic creativity, philosophical insight, and universal humanism.'
    },
    {
      name: 'Raman House',
      color: '#3182CE',
      motto: 'Truth in Discovery',
      mascot: 'Blue Falcon',
      desc: 'Championing scientific inquiry, relentless empirical observation, and analytical innovation.'
    },
    {
      name: 'Teresa House',
      color: '#38A169',
      motto: 'Service above Self',
      mascot: 'Green Dolphin',
      desc: 'Fostering profound empathy, selfless community service, and environmental stewardship.'
    },
    {
      name: 'Vivekananda House',
      color: '#D69E2E',
      motto: 'Arise, Awake, Achieve',
      mascot: 'Golden Lion',
      desc: 'Inspiring moral courage, athletic vigor, leadership tenacity, and character sovereignty.'
    }
  ];

  return (
    <div>
      <PageBanner
        title="Curricular & Co-Curricular Activities"
        subtitle="Unleashing creativity, athleticism, leadership, and camaraderie beyond the traditional classroom."
        breadcrumbs={[{ label: 'Curricular Activities' }]}
      />

      <section className="subpage-content-wrap">
        <div className="container">
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}
          >
            {[
              { id: 'clubs', label: 'Clubs & Societies' },
              { id: 'sports', label: 'Athletics & Sports' },
              { id: 'houses', label: 'The Four Houses' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  border: '1.5px solid',
                  borderColor: activeCategory === tab.id ? 'var(--gold-primary)' : 'var(--border-color)',
                  background: activeCategory === tab.id ? 'var(--navy-primary)' : '#ffffff',
                  color: activeCategory === tab.id ? 'var(--gold-light)' : 'var(--text-dark)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Clubs Grid */}
          {activeCategory === 'clubs' && (
            <div className="feature-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {clubs.map((c, idx) => (
                <div key={idx} className="feat-card">
                  <div>
                    <div className="feat-icon-box">
                      <i className={`fa-solid ${c.icon}`}></i>
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                  <span className="feat-link">
                    Weekly Sessions <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Sports Grid */}
          {activeCategory === 'sports' && (
            <div className="feature-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {sports.map((s, idx) => (
                <div key={idx} className="feat-card">
                  <div>
                    <div className="feat-icon-box">
                      <i className={`fa-solid ${s.icon}`}></i>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                  <span className="feat-link">
                    Varsity Coaching <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* House System */}
          {activeCategory === 'houses' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px'
              }}
            >
              {houses.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    borderTop: `6px solid ${h.color}`,
                    padding: '30px 24px',
                    boxShadow: '0 8px 24px rgba(11, 27, 61, 0.06)',
                    border: '1px solid var(--border-color)',
                    borderTopWidth: '6px'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: h.color, letterSpacing: '1px' }}>
                    {h.mascot.toUpperCase()}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', margin: '8px 0' }}>
                    {h.name}
                  </h3>
                  <div
                    style={{
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      marginBottom: '14px'
                    }}
                  >
                    "{h.motto}"
                  </div>
                  <p style={{ color: 'var(--text-dark)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div
            className="subpage-card"
            style={{
              marginTop: '50px',
              textAlign: 'center',
              background: 'var(--cream-bg)',
              border: '1px solid var(--border-warm)'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', marginBottom: '10px' }}>
              Holistic Development Is Our Hallmark
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 20px' }}>
              Every student participates in at least one sporting discipline and one creative society every semester.
            </p>
            <Link to="/contact" className="btn-gold" style={{ display: 'inline-flex' }}>
              Enquire About Admissions <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
