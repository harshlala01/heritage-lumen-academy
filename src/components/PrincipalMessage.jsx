import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PrincipalMessage() {
  const [signatureDrawn, setSignatureDrawn] = useState(false);

  return (
    <section 
      className="principal-voice-section"
      onMouseEnter={() => setSignatureDrawn(true)}
    >
      <div className="container">
        <div className="principal-voice-grid">
          {/* Left: Circular Photo with Gold Glow and Breathing Animation */}
          <div className="principal-portrait-wrapper">
            <div className="principal-radial-glow"></div>
            <div className="principal-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Dr. Eleanor Vance - Head of Institution"
                className="principal-photo-img"
              />
              <div className="principal-seal-badge" title="Affiliated CISCE Leader">
                <i className="fa-solid fa-award"></i>
              </div>
            </div>
            <div className="principal-caption-box">
              <h4 className="principal-name">Dr. Eleanor Vance, Ph.D.</h4>
              <p className="principal-role">Head of Institution / Principal</p>
              <span className="principal-creds">M.Ed. (Oxon), Ph.D. Educational Leadership</span>
            </div>
          </div>

          {/* Right: Gold Quote, Revealing Text, Animated Signature, Action Buttons */}
          <div className="principal-content-wrapper">
            <div className="principal-eyebrow">
              <span className="principal-eyebrow-line"></span>
              <span>PRINCIPAL'S DESK (THE VOICE)</span>
            </div>

            <div className="principal-quote-container">
              <div className="principal-giant-quote">“</div>
              <blockquote className="principal-manifesto-text">
                Education at Heritage Lumen is not simply the acquisition of facts, but the ignition of intellect, curiosity, and ethical stewardship for an interconnected world.
              </blockquote>
            </div>

            <p className="principal-body-paragraph">
              When a young scholar steps through our gates, they enter an intellectual covenant. We do not simply teach; we mentor. Our faculty is committed to cultivating critical inquiry, scientific rigor, moral compass, and fearless creativity within a collegiate setting that honors both tradition and modern discovery.
            </p>

            {/* Handwritten Signature that draws itself with SVG */}
            <div className="principal-signature-area">
              <svg 
                className={`principal-svg-signature ${signatureDrawn ? 'drawn' : ''}`}
                viewBox="0 0 280 70" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M10 45 C30 15, 45 10, 60 30 C75 50, 85 20, 100 25 C115 30, 120 40, 140 20 C155 5, 170 35, 185 25 C200 15, 215 30, 235 22 C255 14, 265 28, 275 35 M45 42 Q90 55 170 48 T270 42" 
                  stroke="#D4AF37" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <div className="signature-title">Dr. Eleanor Vance — Head of Institution</div>
            </div>

            {/* Buttons */}
            <div className="principal-actions-row">
              <Link to="/about/principal-desk" className="btn-principal-gold-outline">
                Read Full Address <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="btn-principal-navy-filled">
                <i className="fa-solid fa-calendar-check"></i> Schedule an Interaction
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


