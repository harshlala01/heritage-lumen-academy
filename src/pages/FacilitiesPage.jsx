import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';

export default function FacilitiesPage() {
  // Only ONE accordion item open at a time per section/column
  const [openCol1, setOpenCol1] = useState('col1_0'); // Spacious Classrooms open by default
  const [openCol2, setOpenCol2] = useState('col2_0'); // Playground open by default

  const toggleCol1 = (id) => {
    setOpenCol1((prev) => (prev === id ? null : id));
  };

  const toggleCol2 = (id) => {
    setOpenCol2((prev) => (prev === id ? null : id));
  };

  const col1Facilities = [
    {
      id: 'col1_0',
      title: 'SPACIOUS CLASSROOMS',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop',
      desc: 'Bright and child-friendly classrooms provide the right ambience for learning, classroom are spacious and are well-ventilated with comfortable furniture.'
    },
    {
      id: 'col1_1',
      title: 'SMART CLASS',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
      desc: 'Interactive 4K smart digital display consoles, audio-visual projection, and high-tech multimedia content to make difficult concepts easy and visual.'
    },
    {
      id: 'col1_2',
      title: 'LIBRARY',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop',
      desc: 'Rich collection of over 25,000 books including encyclopedias, reference texts, international journals, classical literature, and quiet study carrels.'
    },
    {
      id: 'col1_3',
      title: 'LABORATORIES',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=600&auto=format&fit=crop',
      desc: 'Modern Physics, Chemistry, Biology, and Computer/Robotics laboratories equipped with scientific apparatus, fume hoods, and IoT discovery kits.'
    },
    {
      id: 'col1_4',
      title: 'SPACIOUS MULTIPURPOSE HALL',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
      desc: 'Acoustically designed large auditorium and multipurpose hall for morning assemblies, annual prize distributions, debates, and musical concerts.'
    },
    {
      id: 'col1_5',
      title: 'WELL MAINTAINED TOILETS',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop',
      desc: 'Hygienic, automated sanitization restrooms on all academic floors with dedicated female attendants, continuous water supply, and clean safety.'
    },
    {
      id: 'col1_6',
      title: 'TRANSPORT',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop',
      desc: 'Safe, air-conditioned bus fleet fitted with GPS tracking, speed regulators, onboard CCTV cameras, first-aid kits, and verified female escorts.'
    },
    {
      id: 'col1_7',
      title: 'CCTV MONITORING',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop',
      desc: 'Comprehensive 24/7 CCTV surveillance network spanning all entry gates, corridors, activity zones, and perimeter fences ensuring student safety.'
    }
  ];

  const col2Facilities = [
    {
      id: 'col2_0',
      title: 'PLAYGROUND',
      image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=600&auto=format&fit=crop',
      desc: 'Multiple fields for outdoor and sports activities are available for the students to play freely. There is also a small separate playground for the lower section students.'
    },
    {
      id: 'col2_1',
      title: 'KIDS PLAY AREA',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
      desc: 'Dedicated safe rubberized play arena with colorful slides, swings, seesaws, and sensory developmental play installations for Pre-Primary children.'
    },
    {
      id: 'col2_2',
      title: 'AMENITIES FOR INDOOR GAMES',
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop',
      desc: 'Specialized indoor sports hall for table tennis, carrom, chess, yoga, and gymnastics conditioning under certified coaches.'
    },
    {
      id: 'col2_3',
      title: 'OUTDOOR GAMES AREA',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
      desc: 'Full-size regulation basketball courts, cricket practice nets with bowling machines, volleyball arena, and badminton courts.'
    },
    {
      id: 'col2_4',
      title: 'FIRE SAFETY',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=600&auto=format&fit=crop',
      desc: 'Certified modern fire extinguishers, smoke alarm detectors, wide emergency evacuation exits, and regular mock drill rehearsals.'
    },
    {
      id: 'col2_5',
      title: 'MEDICAL AIDS',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop',
      desc: 'Well-equipped infirmary with trained medical staff, emergency oxygen, first-aid essentials, and direct tie-ups with multi-speciality hospitals.'
    },
    {
      id: 'col2_6',
      title: 'ONLINE CLASS AND EXAMINATION',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      desc: 'Integrated digital e-learning platform facilitating live lecture broadcasts, online quizzes, digital homework submissions, and student performance tracking.'
    }
  ];

  return (
    <div>
      <PageBanner
        title="Our Campus Facilities"
        subtitle="Modern infrastructure, lush green environment, and child-centric amenities designed for safety, comfort, and holistic learning."
        breadcrumbs={[{ label: 'Facilities' }]}
      />

      <section className="facilities-page-wrap">
        <div className="container">
          {/* Top Hero Section matching screenshot */}
          <div className="facilities-hero-grid">
            {/* Left Image with offset yellow border frame */}
            <div className="facilities-hero-img-box">
              <div className="facilities-hero-frame" />
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop"
                alt="Clean School Building With Lush Green Campus"
                className="facilities-hero-img"
              />
            </div>

            {/* Right Text Content */}
            <div className="facilities-hero-text">
              <h4>Facilities</h4>
              <h1>Clean School Building With Lush Green Campus</h1>
              <p>
                The school campus with the superb play of colours of the flowers amidst the greenery
                of the trees and plants around presents a joyous and eye-soothing beauty. The school
                and office building is engulfed dearly in the lush green plants and colourful flowers in
                the garden under the canopy of azure sky that appears much like the ashram of the vedic age.
                Buildings are fitted with modern accessories of city life for comfort and convenience. A
                wonderful blending of rural beauty and urban amenities, pollution free healthy
                environment, neat and clean school building and campus.
              </p>
            </div>
          </div>

          {/* Two-Column Accordions Grid matching screenshot */}
          <div className="facilities-accordions-grid">
            {/* Column 1 (Section 1) */}
            <div>
              {col1Facilities.map((item) => {
                const isOpen = openCol1 === item.id;
                return (
                  <div
                    className={`facility-acc-item ${isOpen ? 'expanded' : ''}`}
                    key={item.id}
                  >
                    <button
                      className="facility-acc-header"
                      onClick={() => toggleCol1(item.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="facility-acc-title">{item.title}</span>
                      <div className="facility-acc-btn">
                        <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="facility-acc-content">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="facility-acc-thumb"
                        />
                        <div className="facility-acc-desc">{item.desc}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Column 2 (Section 2) */}
            <div>
              {col2Facilities.map((item) => {
                const isOpen = openCol2 === item.id;
                return (
                  <div
                    className={`facility-acc-item ${isOpen ? 'expanded' : ''}`}
                    key={item.id}
                  >
                    <button
                      className="facility-acc-header"
                      onClick={() => toggleCol2(item.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="facility-acc-title">{item.title}</span>
                      <div className="facility-acc-btn">
                        <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="facility-acc-content">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="facility-acc-thumb"
                        />
                        <div className="facility-acc-desc">{item.desc}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
