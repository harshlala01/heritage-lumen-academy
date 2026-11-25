import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';

export default function FacilitiesPage() {
  // Only ONE accordion item open at a time per section/column
  const [openCol1, setOpenCol1] = useState('col1_0'); // Audio-visual Teaching open by default
  const [openCol2, setOpenCol2] = useState('col2_0'); // Well G.K Practices open by default

  const toggleCol1 = (id) => {
    setOpenCol1((prev) => (prev === id ? null : id));
  };

  const toggleCol2 = (id) => {
    setOpenCol2((prev) => (prev === id ? null : id));
  };

  // Exactly matching the 12 facilities from the official brochure image
  const col1Facilities = [
    {
      id: 'col1_0',
      title: 'AUDIO-VISUAL TEACHING',
      subtitle: 'Audio-visual Teaching',
      icon: 'fa-solid fa-chalkboard-user',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
      desc: 'Smart 4K interactive digital display consoles, projector-based audiovisual instruction, and multimedia pedagogical software making complex curricular concepts engaging, visual, and easily understood.'
    },
    {
      id: 'col1_1',
      title: 'CCTV - 24/7 SURVEILLANCE',
      subtitle: 'CCTV -',
      icon: 'fa-solid fa-video',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop',
      desc: 'Comprehensive 24/7 high-definition CCTV security surveillance spanning all classroom halls, gates, playgrounds, stairways, and corridors ensuring an entirely secure environment for every child.'
    },
    {
      id: 'col1_2',
      title: 'HIGH QUALITY SCIENCE AND COMPUTER',
      subtitle: 'High Quality Science and computer',
      icon: 'fa-solid fa-flask-vial',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=600&auto=format&fit=crop',
      desc: 'Modern Physics, Chemistry, Biology laboratories alongside high-speed Computer laboratories equipped with advanced practical instruments, apparatus, and individual computer workstations.'
    },
    {
      id: 'col1_3',
      title: 'LANGUAGE TRAINING',
      subtitle: 'Language Training',
      icon: 'fa-solid fa-language',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
      desc: 'Specialized English phonetics, linguistic lab drills, public speaking sessions, and vocabulary building programs designed to instill effortless verbal fluency, pronunciation accuracy, and bilingual confidence.'
    },
    {
      id: 'col1_4',
      title: 'SPECIAL MATH PRACTICES',
      subtitle: 'Special math Practices.',
      icon: 'fa-solid fa-calculator',
      image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=600&auto=format&fit=crop',
      desc: 'Daily quantitative problem-solving practice, Vedic mathematics shortcut techniques, conceptual arithmetic modules, and analytical exercises to eliminate math fear and build sharp numerical intuition.'
    },
    {
      id: 'col1_5',
      title: 'MULTIPLE INTELLIGENCE BASED PEDAGOGY',
      subtitle: 'Multiple Intelligence based pedagogy.',
      icon: 'fa-solid fa-brain',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
      desc: 'Progressive curriculum designed around Howard Gardner’s Multiple Intelligences theory—tailoring instruction to each student’s unique linguistic, logical-mathematical, spatial, bodily-kinesthetic, musical, and interpersonal strengths.'
    }
  ];

  const col2Facilities = [
    {
      id: 'col2_0',
      title: 'WELL G.K PRACTICES & IDEAL COUNSELLING',
      subtitle: "Well G.K Practices, Ideal counselling to Analyse Student's Problem and Solution",
      icon: 'fa-solid fa-lightbulb',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      desc: "Structured daily General Knowledge quizzes, national affairs discussions, and dedicated one-on-one psychological counseling to diagnose each student's challenges and formulate effective solutions."
    },
    {
      id: 'col2_1',
      title: "QUALITY TEACHER'S",
      subtitle: "Quality Teacher's",
      icon: 'fa-solid fa-user-graduate',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop',
      desc: 'A dedicated cohort of highly qualified, compassionate, and experienced CBSE educators committed to personalized mentoring, modern child pedagogy, and inspiring intellectual curiosity.'
    },
    {
      id: 'col2_2',
      title: 'TRANSPORT',
      subtitle: 'Transport',
      icon: 'fa-solid fa-bus',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop',
      desc: 'Safe, punctual, and comfortable fleet of school buses and vans connecting Nagarukhra, Jagulia, Barasat, and surrounding areas, equipped with verified drivers and student care attendants.'
    },
    {
      id: 'col2_3',
      title: 'CHILD MOTIVATION CLASS',
      subtitle: 'Child motivation class.',
      icon: 'fa-solid fa-award',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
      desc: 'Regular inspirational seminars, moral guidance assemblies, positive mindset coaching, and leadership workshops that foster resilience, enthusiasm, and strong character in children.'
    },
    {
      id: 'col2_4',
      title: 'PARENT COUNSELLING AND PTM',
      subtitle: 'Parent conseelling and PTM',
      icon: 'fa-solid fa-users',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
      desc: 'Collaborative Parent-Teacher Meetings (PTM) and professional parenting guidance sessions to build a harmonious bridge between home and school for holistic child development.'
    },
    {
      id: 'col2_5',
      title: 'EXTRA COACHING AFTER SCHOOL',
      subtitle: 'Extra coaching After School',
      icon: 'fa-solid fa-book-open-reader',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
      desc: 'Specialized after-school tutorial and remedial coaching sessions providing individualized attention, homework assistance, and intensive board examination preparation.'
    }
  ];

  return (
    <div>
      <PageBanner
        title="Our Campus Facilities"
        subtitle="12 core educational and developmental facilities designed to foster academic excellence, personal safety, and well-rounded growth."
        breadcrumbs={[{ label: 'Facilities' }]}
      />

      <section className="facilities-page-wrap">
        <div className="container">
          
          {/* Top Hero Section matching brochure */}
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

          {/* Section Header */}
          <div className="facilities-list-header-bar">
            <div className="facilities-bar-title-box">
              <span className="facilities-bar-tag">OUR EXCLUSIVE AMENITIES</span>
              <h2 className="facilities-bar-heading">Facilities :</h2>
            </div>
            <p className="facilities-bar-desc">
              Explore the 12 specialized academic, pedagogical, and infrastructural facilities provided for our scholars:
            </p>
          </div>

          {/* Two-Column Accordions Grid matching screenshot */}
          <div className="facilities-accordions-grid">
            {/* Column 1 (Section 1: Items 1 to 6) */}
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
                      <div className="facility-acc-title-wrap">
                        <span className="facility-acc-icon-circle">
                          <i className={item.icon}></i>
                        </span>
                        <span className="facility-acc-title">{item.title}</span>
                      </div>
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

            {/* Column 2 (Section 2: Items 7 to 12) */}
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
                      <div className="facility-acc-title-wrap">
                        <span className="facility-acc-icon-circle">
                          <i className={item.icon}></i>
                        </span>
                        <span className="facility-acc-title">{item.title}</span>
                      </div>
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
