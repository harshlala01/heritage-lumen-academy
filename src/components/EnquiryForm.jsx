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
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'parentPhone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setPhoneError('');
      setFormData((prev) => ({
        ...prev,
        parentPhone: digitsOnly
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);

  //   // Simulate instant client-side validation & processing
  //   setTimeout(() => {
  //     setSubmitting(false);
  //     if (onSubmitSuccess) {
  //       onSubmitSuccess(formData);
  //     }
  //     // Reset form
  //     setFormData({
  //       parentName: '',
  //       studentName: '',
  //       parentEmail: '',
  //       parentPhone: '',
  //       gradeSelect: '',
  //       academicYear: '2025-2026',
  //       enquiryMessage: ''
  //     });
  //   }, 400);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.parentPhone)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return;
    }
    setPhoneError('');
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // Success
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
      } else {
        alert('Error: ' + (result.message || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Connection to the backend failed. Is the server up and running?');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <section className="enquiry-wrap" id="enquiry">
      <div className="container">
        <div className="enquiry-grid">
          {/* Left Details */}
          <div>
            <span className="section-label">CONNECT WITH ADMISSIONS</span>
            <h2 className="main-heading">Schedule Your Campus Visit</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '12px' }}>
              We welcome prospective scholars and their families to experience the vibrant
              atmosphere of The Rabindra Bharati Heritage Day School firsthand.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '12px' }}>
              The school would like parents to maintain a close rapport with their ward's teachers and meet them periodically. The Principal and members of the faculty will make every effort to make themselves available to meet parents on request, at mutually convenient times on working days, by prior appointment.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '22px' }}>
              Parents are required to call up the school in advance to ask for an appointment and visit the school only after they have been given a confirmed time and date. Any visiting parent seek to meet school authorities or teachers without appointment, they may be denied the request.
            </p>

            <div className="contact-card-box">
              <div className="contact-line">
                <div className="contact-line-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="contact-line-text">
                  <h6>Academy Address</h6>
                  <p>607/E, Nagarukhra - Jagulia Rd, West, Barasat, Nagarukhra, West Bengal 741257</p>
                </div>
              </div>

              <div className="contact-line">
                <div className="contact-line-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="contact-line-text">
                  <h6>Admissions & Contact Helpline</h6>
                  <p><a href="tel:+918001271960" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8001271960</a></p>
                </div>
              </div>

              <div className="contact-line">
                <div className="contact-line-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="contact-line-text">
                  <h6>Email Address</h6>
                  <p><a href="mailto:newrabindrabharattschool@gmail.com" style={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-all' }}>newrabindrabharattschool@gmail.com</a></p>
                </div>
              </div>

              <div className="contact-line">
                <div className="contact-line-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="contact-line-text">
                  <h6>School Office Hours</h6>
                  <p>10:00 AM – 3:30 PM (Monday – Friday)</p>
                  <p style={{ fontSize: '0.78rem', color: '#b91c1c', marginTop: '2px' }}>
                    *School will remain closed on Sundays and other holidays of the months.
                  </p>
                </div>
              </div>

              <div className="contact-line">
                <div className="contact-line-icon">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div className="contact-line-text">
                  <h6>Visiting Timing (The Principal)</h6>
                  <p>Monday, Wednesday and Friday – 11:00 AM – 1:00 PM</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--navy-primary)', fontWeight: 600, marginTop: '2px' }}>
                    *By confirmed prior appointment only
                  </p>
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
                    inputMode="numeric"
                    id="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    placeholder="Enter 10-digit phone number"
                    required
                  />
                  {phoneError && (
                    <span style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                      {phoneError}
                    </span>
                  )}
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
                    <option value="Secondary School (Grades IX-X / CBSE)">
                      Secondary School (Grades IX-X / CBSE)
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
