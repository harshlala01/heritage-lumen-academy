import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import principalImg from '../assets/principal.png';

export default function PrincipalMessage() {
  const [signatureDrawn, setSignatureDrawn] = useState(false);
  const faculty = useContent('faculty', [{
    id: 1,
    title: 'Mithu Sinha Bhattacharya',
    subtitle: 'Principal',
    image: principalImg
  }]);
  const principal = faculty[0];
  const principalImageSrc = (principal?.image_path && !principal.image_path.includes('unsplash') && !principal.image_path.includes('1573496359142'))
    ? (principal.image_path === '/principal.png' ? principalImg : contentImage(principal.image_path))
    : principalImg;

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
                src={principalImageSrc}
                alt={principal?.title || "Principal"}
                className="principal-photo-img"
              />
              <div className="principal-seal-badge" title="Affiliated CBSE Leader">
                <i className="fa-solid fa-award"></i>
              </div>
            </div>
            <div className="principal-caption-box">
              <h4 className="principal-name">{principal.title}</h4>
              <p className="principal-role">Principal</p>
            </div>
          </div>

          {/* Right: Gold Quote, Revealing Text, Action Buttons */}
          <div className="principal-content-wrapper">
            <div className="principal-eyebrow">
              <span className="principal-eyebrow-line"></span>
              <span>PRINCIPAL'S DESK (THE VOICE)</span>
            </div>

            <div className="principal-quote-container">
              <div className="principal-giant-quote">“</div>
              <blockquote className="principal-manifesto-text">
                Education at The Rabindra Bharati Heritage Day School is not simply the acquisition of facts, but the ignition of intellect, curiosity, and ethical stewardship for an interconnected world.
              </blockquote>
            </div>

            <p className="principal-body-paragraph">
              When a young scholar steps through our gates, they enter an intellectual covenant. We do not simply teach; we mentor. Our faculty is committed to cultivating critical inquiry, scientific rigor, moral compass, and fearless creativity within a collegiate setting that honors both tradition and modern discovery.
            </p>

            <div className="principal-signature-area" style={{ marginTop: '16px', marginBottom: '8px' }}>
              <div className="signature-title" style={{ fontSize: '1.05rem', color: '#D4AF37', fontWeight: 600 }}>
                Mithu Sinha Bhattacharya — Principal
              </div>
            </div>

            {/* Button */}
            <div className="principal-actions-row">
              <Link to="/about/principal-desk" className="btn-principal-gold-outline">
                Read Full Address <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


