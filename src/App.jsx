import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SuccessModal from './components/SuccessModal';
import BackToTop from './components/BackToTop';
import AnnouncementBannerModal from './components/AnnouncementBannerModal';
import AnnouncementTickerBar from './components/AnnouncementTickerBar';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import SchoolFoundation from './pages/about/SchoolFoundation';
import Management from './pages/about/Management';
import SecretaryDesk from './pages/about/SecretaryDesk';
import PrincipalDesk from './pages/about/PrincipalDesk';
import FacilitiesPage from './pages/FacilitiesPage';
import AcademicsPage from './pages/AcademicsPage';
import CurricularActivitiesPage from './pages/CurricularActivitiesPage';
import GalleryPage from './pages/GalleryPage';
import NoticePage from './pages/NoticePage';
import ContactPage from './pages/ContactPage';

// 🔽 NEW IMPORTS (Portal)
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ContentManager from './pages/ContentManager';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryData, setEnquiryData] = useState(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  const handleEnquirySuccess = (data) => {
    setEnquiryData(data);
    setModalOpen(true);
  };

  return (
    <Router>
      {/* 1. Global Preloader Animation */}
      <Preloader />

      {/* 2. Global Smooth Scroll Engine (Lenis) */}
      <SmoothScroll />

      {/* 3. Scroll Progress Indicator Line (Top 3px Gold) */}
      <ScrollProgress />

      {/* Router Scroll to Top Helper */}
      <ScrollToTop />

      <div className="heritage-app">
        {/* 1. Announcement Bar */}
        <AnnouncementTickerBar onOpenBanner={() => setIsBannerOpen(true)} />

        {/* 2. Sticky & Transparent-to-Cream Main Navbar Header */}
        <Navbar onOpenBanner={() => setIsBannerOpen(true)} />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage onEnquirySuccess={handleEnquirySuccess} />} />
          <Route path="/about/foundation" element={<SchoolFoundation />} />
          <Route path="/about/management" element={<Management />} />
          <Route path="/about/secretary-desk" element={<SecretaryDesk />} />
          <Route path="/about/principal-desk" element={<PrincipalDesk />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/activities" element={<CurricularActivitiesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/contact" element={<ContactPage onEnquirySuccess={handleEnquirySuccess} />} />

          {/* 🔽 NEW ROUTES (Portal) */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/content" element={<ContentManager />} />

          <Route path="*" element={<HomePage onEnquirySuccess={handleEnquirySuccess} />} />
        </Routes>

        {/* Global Footer */}
        <Footer />

        {/* Global Admission Success Celebration Modal */}
        <SuccessModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          enquiryData={enquiryData}
        />

        {/* Promotional / Toppers Announcement Banner Popup Modal */}
        <AnnouncementBannerModal
          isOpen={isBannerOpen}
          onClose={() => setIsBannerOpen(false)}
        />

        {/* Floating Back to Top Button */}
        <BackToTop />
      </div>
    </Router>
  );
}