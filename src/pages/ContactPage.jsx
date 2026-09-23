import React from 'react';
import PageBanner from '../components/PageBanner';
import EnquiryForm from '../components/EnquiryForm';

export default function ContactPage({ onEnquirySuccess }) {
  return (
    <div>
      <PageBanner
        title="Contact & Admissions Office"
        subtitle="We invite prospective families, scholars, and visitors to connect with our administrative and admissions team."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* Embedded Enquiry Form */}
      <EnquiryForm onSubmitSuccess={onEnquirySuccess} />

      {/* Department Directory */}
      <section style={{ padding: '0 0 80px', background: 'var(--white)' }}>
        <div className="container">
          <div className="subpage-card">
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', marginBottom: '20px' }}>
              Academy Department Directory
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px'
              }}
            >
              <div>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Admissions & General Enquiries</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-phone" style={{ color: 'var(--gold-primary)', marginRight: '6px' }}></i> <a href="tel:+918001271960" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8001271960</a><br />
                  <i className="fa-solid fa-envelope" style={{ color: 'var(--gold-primary)', marginRight: '6px' }}></i> <a href="mailto:therabindrabharatihds@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>therabindrabharatihds@gmail.com</a><br />
                  Hours: Mon–Fri 10:30 AM – 3:00 PM
                </p>
              </div>

              <div>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Principal’s Secretariat</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-phone" style={{ color: 'var(--gold-primary)', marginRight: '6px' }}></i> <a href="tel:+918001271960" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8001271960</a><br />
                  <i className="fa-solid fa-envelope" style={{ color: 'var(--gold-primary)', marginRight: '6px' }}></i> <a href="mailto:therabindrabharatihds@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>therabindrabharatihds@gmail.com</a><br />
                  By Prior Appointment Only
                </p>
              </div>

              <div>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Accounts & Fee Desk</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-phone" style={{ color: 'var(--gold-primary)', marginRight: '6px' }}></i> +1 (555) 234-5682<br />
                  <i className="fa-solid fa-envelope" style={{ color: 'var(--gold-primary)', marginRight: '6px' }}></i> accounts@heritagelumen.edu<br />
                  Hours: Mon–Sat 9:00 AM – 2:00 PM
                </p>
              </div>

              <div>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Transport & Fleet Office</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-phone" style={{ color: 'var(--gold-primary)', marginRight: '6px' }}></i> +1 (555) 234-5690<br />
                  <i className="fa-solid fa-envelope" style={{ color: 'var(--gold-primary)', marginRight: '6px' }}></i> transport@heritagelumen.edu<br />
                  Emergency Route Helpline Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
