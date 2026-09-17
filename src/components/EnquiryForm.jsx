import React, { useState } from 'react';

export default function EnquiryForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    parentEmail: '',
    parentPhone: '',
    gradeSelect: '',
    academicYear: '2025-2026',
    enquiryMessage: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate instant client-side validation & processing
    setTimeout(() => {
      setSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
      // Reset form
      setFormData({
        parentName: '',
        studentName: '',
        parentEmail: '',
        parentPhone: '',
        gradeSelect: '',
        academicYear: '2025-2026',
        enquiryMessage: ''
      });
    }, 400);
  };

  return (
    <section className="enquiry-wrap" id="enquiry">
      <div className="container">
        <div className="enquiry-grid">
          {/* Left Details */}
          <div>
            <span className="section-label">CONNECT WITH ADMISSIONS</span>
            <h2 className="main-heading">Schedule Your Campus Visit</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              We welcome prospective scholars and their families to experience the vibrant
              atmosphere of Heritage Lumen firsthand.
            </p>

            <div className="contact-card-box">
              <div className="contact-line">
                <div className="contact-line-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="contact-line-text">
                  <h6>Academy Address</h6>
                  <p>Heritage Lumen Preparatory Academy, St. Jude's Hill, Academy Boulevard</p>
                </div>
              </div>

              <div className="contact-line">
                <div className="contact-line-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="contact-line-text">
                  <h6>Admissions Desk Helpline</h6>
                  <p>+1 (555) 234-5678 / +91 (0) 80 4920 1800</p>
                </div>
              </div>

              <div className="contact-line">
                <div className="contact-line-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="contact-line-text">
                  <h6>Office Hours</h6>
                  <p>Monday – Saturday: 8:00 AM – 4:30 PM</p>
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '4px solid var(--cream-bg)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
                alt="Campus Quad"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(7, 19, 43, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: 'var(--white)',
                  fontWeight: 700
                }}
              >
                <div className="play-btn-circle">
                  <i className="fa-solid fa-video"></i>
                </div>
                <span>Watch 3-Minute Campus Film</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="form-container-card">
            <h3>Admission & Tour Enquiry</h3>
            <p>
              Complete this form and our Admissions Directorate will connect with you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} id="dynamicAdmissionForm">
              <div className="input-row">
                <div className="form-field">
                  <label htmlFor="parentName">Parent Name *</label>
                  <input
                    type="text"
                    id="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="e.g. Vikramaditya Sharma"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="studentName">Student Name *</label>
                  <input
                    type="text"
                    id="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="e.g. Devendra Sharma"
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="form-field">
                  <label htmlFor="parentEmail">Email Address *</label>
                  <input
                    type="email"
                    id="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    placeholder="parent@example.com"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="parentPhone">Phone Number *</label>
                  <input
                    type="tel"
                    id="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="form-field">
                  <label htmlFor="gradeSelect">Grade Applying For *</label>
                  <select
                    id="gradeSelect"
                    value={formData.gradeSelect}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Grade Level
                    </option>
                    <option value="Early Years / Kindergarten (Ages 3-5)">
                      Early Years / Kindergarten (Ages 3-5)
                    </option>
                    <option value="Primary School (Grades I-V)">
                      Primary School (Grades I-V)
                    </option>
                    <option value="Middle School (Grades VI-VIII)">
                      Middle School (Grades VI-VIII)
                    </option>
                    <option value="Senior School (Grades IX-X / ICSE)">
                      Senior School (Grades IX-X / ICSE)
                    </option>
                    <option value="Senior Secondary (Grades XI-XII / ISC)">
                      Senior Secondary (Grades XI-XII / ISC)
                    </option>
                    <option value="International Baccalaureate (IB DP)">
                      International Baccalaureate (IB DP)
                    </option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="academicYear">Academic Year *</label>
                  <select
                    id="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange}
                    required
                  >
                    <option value="2025-2026">2025 – 2026</option>
                    <option value="2026-2027">2026 – 2027</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="enquiryMessage">Questions or Preferred Tour Date</label>
                <textarea
                  id="enquiryMessage"
                  value={formData.enquiryMessage}
                  onChange={handleChange}
                  placeholder="Tell us about your student's interests or preferred tour timing..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-gold"
                disabled={submitting}
                style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
              >
                {submitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                  </>
                ) : (
                  <>
                    Submit Enquiry <i className="fa-solid fa-paper-plane"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
