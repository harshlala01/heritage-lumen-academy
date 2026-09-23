import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import FacilitiesSlider from '../components/FacilitiesSlider';
import PrincipalMessage from '../components/PrincipalMessage';
import StatutoryAuditTable from '../components/StatutoryAuditTable';
import PhotoGallery from '../components/PhotoGallery';
import ExtraCurricularActivities from '../components/ExtraCurricularActivities';
import CtaBanner from '../components/CtaBanner';

export default function HomePage({ onEnquirySuccess }) {
  return (
    <main>
      <Hero />
      {/* 1. Custom About Us Section */}
      <AboutSection />

      {/* 2. Facilities Cards & Scroller Section */}
      <FacilitiesSlider />

      {/* 3. Principal's Message with Image & Address */}
      <PrincipalMessage />

      {/* 4. Filter Division & Class-Wise Statutory Audit Table */}
      <StatutoryAuditTable />

      {/* 5. Campus Moments & Traditions Gallery */}
      <PhotoGallery />

      {/* 6. Extra Curricular Activities Slider matching 2nd screenshot */}
      <ExtraCurricularActivities />

      {/* 7. Call to Action Banner */}
      <CtaBanner />
    </main>
  );
}

