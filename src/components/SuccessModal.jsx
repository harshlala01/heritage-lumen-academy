import React, { useEffect } from 'react';

export default function SuccessModal({ isOpen, onClose, enquiryData }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const parent = enquiryData?.parentName || 'Parent';
  const student = enquiryData?.studentName || 'Student';
  const grade = enquiryData?.gradeSelect || 'Selected Grade';
  const email = enquiryData?.parentEmail || 'your email';

  return (
    <div className="modal-bg active" onClick={onClose}>
      <div className="modal-box-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-check-icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', marginBottom: '8px' }}>
          Enquiry Received Successfully!
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '22px' }}>
          Thank you <strong>{parent}</strong>! Your admission inquiry for <strong>{student}</strong> (
          {grade}) has been logged successfully. Our Admissions Officer will contact you within 24 hours at{' '}
          <strong>{email}</strong>.
        </p>
        <button
          className="btn-gold"
          onClick={onClose}
          style={{ width: '100%' }}
        >
          Return to Academy Site
        </button>
      </div>
    </div>
  );
}
