import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SuccessModal from './components/SuccessModal';
import BackToTop from './components/BackToTop';
import AnnouncementBannerModal from './components/AnnouncementBannerModal';
import AnnouncementTickerBar from './components/AnnouncementTickerBar';
import ScrollToTop from './components/ScrollToTop';

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
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ContentManager from './pages/ContentManager';

function AppShell({ modalOpen, setModalOpen, enquiryData, isBannerOpen, setIsBannerOpen, handleEnquirySuccess }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin/');

  return (
    <>
      <SmoothScroll />
      {!isAdminRoute && <ScrollProgress />}
      <ScrollToTop />

      <div className={`heritage-app${isAdminRoute ? ' admin-app' : ''}`}>
        {!isAdminRoute && (
          <>
            <AnnouncementTickerBar onOpenBanner={() => setIsBannerOpen(true)} />
            <Navbar onOpenBanner={() => setIsBannerOpen(true)} />
          </>
        )}

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
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/content" element={<ContentManager />} />
          <Route path="*" element={<HomePage onEnquirySuccess={handleEnquirySuccess} />} />
        </Routes>

        {!isAdminRoute && <Footer />}

        {!isAdminRoute && (
          <>
            <SuccessModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              enquiryData={enquiryData}
            />
            <AnnouncementBannerModal
              isOpen={isBannerOpen}
              onClose={() => setIsBannerOpen(false)}
            />
            <BackToTop />
          </>
        )}
      </div>
    </>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryData, setEnquiryData] = useState(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBannerOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleEnquirySuccess = (data) => {
    setEnquiryData(data);
    setModalOpen(true);
  };

  return (
    <Router>
      <AppShell
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        enquiryData={enquiryData}
        isBannerOpen={isBannerOpen}
        setIsBannerOpen={setIsBannerOpen}
        handleEnquirySuccess={handleEnquirySuccess}
      />
    </Router>
  );
}
