import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const galleryFileRef = useRef(null);

  // Authentication & User
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  // Active Tab: 'overview' | 'notices' | 'events' | 'gallery' | 'admissions' | 'enquiries'
  const [activeTab, setActiveTab] = useState('overview');

  // Stats
  const [stats, setStats] = useState({
    total_enquiries: 0,
    active_notices: 0,
    upcoming_events: 0,
    gallery_items: 0,
    recent_enquiries: []
  });

  // Notices state
  const [notices, setNotices] = useState([]);
  const [noticesLoading, setNoticesLoading] = useState(false);
  const [noticeSearch, setNoticeSearch] = useState('');
  const [noticeCategoryFilter, setNoticeCategoryFilter] = useState('all');
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [noticeFormData, setNoticeFormData] = useState({
    title: '',
    notice_date: '',
    category: 'admissions',
    description: '',
    attachment_path: '',
    attachment_name: '',
    is_archived: false
  });
  const [noticeUploadLoading, setNoticeUploadLoading] = useState(false);

  // Dynamic Notice Categories state
  const [noticeCategories, setNoticeCategories] = useState([
    { id: 'admissions', label: 'Admissions' },
    { id: 'recruitment', label: 'Recruitment' },
    { id: 'academic', label: 'Academic' },
    { id: 'examination', label: 'Examinations' },
    { id: 'events', label: 'Events' },
    { id: 'holidays', label: 'Holidays' },
    { id: 'general', label: 'General' }
  ]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCatLabel, setNewCatLabel] = useState('');
  const [categorySaving, setCategorySaving] = useState(false);
  const [inlineNewCatOpen, setInlineNewCatOpen] = useState(false);
  const [inlineCatName, setInlineCatName] = useState('');

  // Events state
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    event_date: '',
    event_time: '',
    venue: 'School Auditorium / Campus',
    description: '',
    is_archived: false
  });

  // Gallery state
  const [galleryAlbums, setGalleryAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('annual-function');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryMediaType, setGalleryMediaType] = useState('image'); // 'image' | 'video'
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    media_url: '',
    video_url: ''
  });
  const [galleryUploadLoading, setGalleryUploadLoading] = useState(false);

  // Gallery Category (Album) Management State
  const [albumManageModalOpen, setAlbumManageModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumDesc, setNewAlbumDesc] = useState('');
  const [albumSaving, setAlbumSaving] = useState(false);



  // Enquiries state
  const [enquiries, setEnquiries] = useState([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(false);
  const [enquirySearch, setEnquirySearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Auth Guard
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!savedToken || !savedUser) {
      navigate('/login');
      return;
    }

    try {
      const parsed = JSON.parse(savedUser);
      if (parsed.role !== 'admin') {
        navigate('/login');
        return;
      }
      setUser(parsed);
      setToken(savedToken);
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  // Initial Load once authenticated
  useEffect(() => {
    if (!token) return;
    loadStats();
    loadNotices();
    loadNoticeCategories();
    loadEvents();
    loadGalleryAlbums();
    loadEnquiries();
  }, [token]);

  // Load Album items when selectedAlbum changes
  useEffect(() => {
    if (selectedAlbum) {
      loadGalleryItems(selectedAlbum);
    }
  }, [selectedAlbum]);

  // ---------- FETCHERS ----------
  const loadStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error('Failed to load stats', e);
    }
  };

  const loadNotices = async () => {
    setNoticesLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/notices?include_archived=true`);
      if (res.ok) {
        const data = await res.json();
        setNotices(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to load notices', e);
    } finally {
      setNoticesLoading(false);
    }
  };

  const loadEvents = async () => {
    setEventsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/events?include_archived=true`);
      if (res.ok) {
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to load events', e);
    } finally {
      setEventsLoading(false);
    }
  };

  const loadGalleryAlbums = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/gallery/albums`);
      if (res.ok) {
        const data = await res.json();
        setGalleryAlbums(Array.isArray(data) ? data : []);
        if (data.length > 0 && !selectedAlbum) {
          setSelectedAlbum(data[0].slug);
        }
      }
    } catch (e) {
      console.error('Failed to load gallery albums', e);
    }
  };

  const loadGalleryItems = async (slug) => {
    setGalleryLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/gallery/items/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to load gallery items', e);
    } finally {
      setGalleryLoading(false);
    }
  };



  const loadEnquiries = async () => {
    setEnquiriesLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/enquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to load enquiries', e);
    } finally {
      setEnquiriesLoading(false);
    }
  };

  // ---------- FILE UPLOADER HELPER ----------
  const handleGenericFileUpload = async (file, folder = 'documents') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch(`${API_BASE}/api/admin/upload-file`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'File upload failed');
    return data;
  };

  // ---------- NOTICES ACTIONS ----------
  const handleOpenNoticeModal = (notice = null) => {
    if (notice) {
      setEditingNotice(notice);
      setNoticeFormData({
        title: notice.title || '',
        notice_date: notice.notice_date || '',
        category: notice.category || 'admissions',
        description: notice.description || '',
        attachment_path: notice.attachment_path || '',
        attachment_name: notice.attachment_name || '',
        is_archived: Boolean(notice.is_archived)
      });
    } else {
      setEditingNotice(null);
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      setNoticeFormData({
        title: '',
        notice_date: `${dd}/${mm}/${yyyy}`,
        category: 'admissions',
        description: '',
        attachment_path: '',
        attachment_name: '',
        is_archived: false
      });
    }
    setNoticeModalOpen(true);
  };

  const handleNoticeFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNoticeUploadLoading(true);
    try {
      const res = await handleGenericFileUpload(file, 'notices');
      setNoticeFormData((prev) => ({
        ...prev,
        attachment_path: res.path,
        attachment_name: res.filename
      }));
      showToast('Attachment uploaded successfully.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setNoticeUploadLoading(false);
    }
  };

  const handleSaveNotice = async (e) => {
    e.preventDefault();
    if (!noticeFormData.title.trim()) {
      showToast('Please provide a notice title.', 'error');
      return;
    }

    try {
      const url = editingNotice
        ? `${API_BASE}/api/admin/notices/${editingNotice.id}`
        : `${API_BASE}/api/admin/notices`;
      const method = editingNotice ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noticeFormData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Operation failed');

      showToast(editingNotice ? 'Notice updated.' : 'Notice published.');
      setNoticeModalOpen(false);
      loadNotices();
      loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleToggleNoticeArchive = async (notice) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/notices/${notice.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_archived: !notice.is_archived })
      });
      if (res.ok) {
        showToast(notice.is_archived ? 'Notice unarchived.' : 'Notice archived.');
        loadNotices();
        loadStats();
      }
    } catch (err) {
      showToast('Failed to toggle archive', 'error');
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this notice?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/notices/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Notice deleted.');
        setNotices(notices.filter((n) => n.id !== id));
        loadStats();
      }
    } catch (err) {
      showToast('Failed to delete notice', 'error');
    }
  };

  // ---------- NOTICE CATEGORIES ACTIONS ----------
  const loadNoticeCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/settings/notice_categories`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setNoticeCategories(data);
        }
      }
    } catch (e) {
      console.error('Failed to load categories', e);
    }
  };

  const saveNoticeCategories = async (updatedList) => {
    setCategorySaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/settings/notice_categories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedList)
      });
      if (res.ok) {
        setNoticeCategories(updatedList);
        showToast('Notice categories updated successfully.');
      } else {
        throw new Error('Failed to save categories');
      }
    } catch (e) {
      showToast(e.message || 'Error saving categories', 'error');
    } finally {
      setCategorySaving(false);
    }
  };

  const handleAddCategory = async (e) => {
    e?.preventDefault();
    const trimmed = newCatLabel.trim();
    if (!trimmed) {
      showToast('Please enter a category name', 'error');
      return;
    }
    const slug = trimmed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    if (noticeCategories.some((c) => c.id === slug || c.label.toLowerCase() === trimmed.toLowerCase())) {
      showToast('Category already exists', 'error');
      return;
    }
    const updated = [...noticeCategories, { id: slug, label: trimmed }];
    await saveNoticeCategories(updated);
    setNewCatLabel('');
  };

  const handleDeleteCategory = async (catId) => {
    if (noticeCategories.length <= 1) {
      showToast('At least one category is required', 'error');
      return;
    }
    const cat = noticeCategories.find((c) => c.id === catId);
    if (!window.confirm(`Are you sure you want to remove category "${cat ? cat.label : catId}"?`)) return;
    const updated = noticeCategories.filter((c) => c.id !== catId);
    await saveNoticeCategories(updated);
    if (noticeCategoryFilter === catId) {
      setNoticeCategoryFilter('all');
    }
  };

  // ---------- EVENTS ACTIONS ----------
  const handleOpenEventModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setEventFormData({
        title: event.title || '',
        event_date: event.event_date || '',
        event_time: event.event_time || '',
        venue: event.venue || 'School Campus',
        description: event.description || '',
        is_archived: Boolean(event.is_archived)
      });
    } else {
      setEditingEvent(null);
      setEventFormData({
        title: '',
        event_date: '',
        event_time: '10:00 AM – 1:00 PM',
        venue: 'School Auditorium / Ground',
        description: '',
        is_archived: false
      });
    }
    setEventModalOpen(true);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!eventFormData.title.trim()) {
      showToast('Please provide an event title.', 'error');
      return;
    }

    try {
      const url = editingEvent
        ? `${API_BASE}/api/admin/events/${editingEvent.id}`
        : `${API_BASE}/api/admin/events`;
      const method = editingEvent ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventFormData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Operation failed');

      showToast(editingEvent ? 'Event updated.' : 'Event scheduled.');
      setEventModalOpen(false);
      loadEvents();
      loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleToggleEventArchive = async (event) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/events/${event.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_archived: !event.is_archived })
      });
      if (res.ok) {
        showToast(event.is_archived ? 'Event restored.' : 'Event archived.');
        loadEvents();
        loadStats();
      }
    } catch (err) {
      showToast('Failed to toggle archive', 'error');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Event removed.');
        setEvents(events.filter((ev) => ev.id !== id));
        loadStats();
      }
    } catch (err) {
      showToast('Failed to delete event', 'error');
    }
  };

  // ---------- GALLERY ACTIONS ----------
  const handleGalleryImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setGalleryUploadLoading(true);
    try {
      const res = await handleGenericFileUpload(file, 'gallery');
      setGalleryFormData((prev) => ({
        ...prev,
        media_url: res.path
      }));
      showToast('Photo uploaded.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setGalleryUploadLoading(false);
    }
  };

  const handleSaveGalleryItem = async (e) => {
    e.preventDefault();
    const mediaUrl =
      galleryMediaType === 'image'
        ? galleryFormData.media_url
        : galleryFormData.video_url;

    if (!mediaUrl.trim()) {
      showToast(
        galleryMediaType === 'image'
          ? 'Please upload an image file.'
          : 'Please enter a valid YouTube video link.',
        'error'
      );
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/gallery/items`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          album_slug: selectedAlbum,
          item_type: galleryMediaType,
          media_url: mediaUrl,
          title: galleryFormData.title || 'Heritage Day School'
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add item');

      showToast('Item added to album.');
      setGalleryModalOpen(false);
      setGalleryFormData({ title: '', media_url: '', video_url: '' });
      loadGalleryItems(selectedAlbum);
      loadGalleryAlbums();
      loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleReorderGalleryItem = async (id, direction) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/gallery/items/${id}/reorder`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ direction })
      });
      if (res.ok) {
        loadGalleryItems(selectedAlbum);
      }
    } catch (err) {
      showToast('Failed to reorder', 'error');
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!window.confirm('Remove this photo/video from album?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/gallery/items/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Item removed.');
        setGalleryItems(galleryItems.filter((it) => it.id !== id));
        loadGalleryAlbums();
        loadStats();
      }
    } catch (err) {
      showToast('Failed to delete item', 'error');
    }
  };

  // ---------- GALLERY CATEGORY (ALBUM) ACTIONS ----------
  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    const trimmed = newAlbumTitle.trim();
    if (!trimmed) {
      showToast('Please enter a category title', 'error');
      return;
    }
    setAlbumSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/gallery/albums`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: trimmed,
          description: newAlbumDesc.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create category');
      showToast('Category created successfully!');
      setNewAlbumTitle('');
      setNewAlbumDesc('');
      await loadGalleryAlbums();
      if (data.slug) {
        setSelectedAlbum(data.slug);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setAlbumSaving(false);
    }
  };

  const handleUpdateAlbum = async (e) => {
    e.preventDefault();
    if (!editingAlbum || !editingAlbum.title?.trim()) {
      showToast('Category title cannot be empty', 'error');
      return;
    }
    setAlbumSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/gallery/albums/${editingAlbum.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editingAlbum.title.trim(),
          description: (editingAlbum.description || '').trim()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update category');
      showToast('Category updated successfully!');
      setEditingAlbum(null);
      await loadGalleryAlbums();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setAlbumSaving(false);
    }
  };

  const handleDeleteAlbum = async (albumId, albumTitle) => {
    if (
      !window.confirm(
        `Are you sure you want to delete category "${albumTitle}"? All photos inside this category will also be deleted.`
      )
    ) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/gallery/albums/${albumId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete category');
      showToast('Category deleted successfully!');
      const updatedAlbums = galleryAlbums.filter((a) => a.id !== albumId);
      setGalleryAlbums(updatedAlbums);
      if (updatedAlbums.length > 0) {
        setSelectedAlbum(updatedAlbums[0].slug);
      } else {
        setSelectedAlbum('');
        setGalleryItems([]);
      }
      loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };



  // ---------- ENQUIRY ACTIONS ----------
  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this parent enquiry?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Enquiry deleted.');
        setEnquiries(enquiries.filter((enq) => enq.id !== id));
        loadStats();
      }
    } catch (err) {
      showToast('Failed to delete enquiry', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <p style={{ fontFamily: 'var(--font-sans)', color: '#0B1B3A', fontWeight: 600 }}>
          Authenticating School Administrative Portal...
        </p>
      </div>
    );
  }

  // Filtered lists
  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      noticeSearch === '' ||
      n.title?.toLowerCase().includes(noticeSearch.toLowerCase()) ||
      n.description?.toLowerCase().includes(noticeSearch.toLowerCase());
    const nCat = (n.category || '').toLowerCase().trim();
    const activeFilter = noticeCategoryFilter.toLowerCase().trim();
    const matchesCat =
      activeFilter === 'all' ||
      nCat === activeFilter ||
      (activeFilter === 'examination' && (nCat === 'exam' || nCat === 'examinations')) ||
      (activeFilter === 'exam' && (nCat === 'examination' || nCat === 'examinations')) ||
      (activeFilter === 'admissions' && nCat === 'admission') ||
      (activeFilter === 'events' && nCat === 'event');
    return matchesSearch && matchesCat;
  });

  const filteredEnquiries = enquiries.filter((enq) => {
    if (!enquirySearch) return true;
    const q = enquirySearch.toLowerCase();
    return (
      enq.parent_name?.toLowerCase().includes(q) ||
      enq.student_name?.toLowerCase().includes(q) ||
      enq.parent_email?.toLowerCase().includes(q) ||
      enq.parent_phone?.includes(q) ||
      enq.grade?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="admin-cms-wrapper">
      {/* TOAST MESSAGE */}
      {toast && (
        <div className={`admin-toast-banner ${toast.type}`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)}>&times;</button>
        </div>
      )}

      {/* TOP CMS HEADER */}
      <header className="admin-header-bar">
        <div className="admin-header-brand">
          <img
            src="/logo.jpg"
            alt="The Rabindra Bharati Heritage Day School"
            className="admin-brand-logo-img"
          />
          <div>
            <h1 className="admin-portal-title">THE RABINDRA BHARATI HERITAGE DAY SCHOOL</h1>
            <p className="admin-portal-subtitle">Institutional CMS & Executive Administration Console</p>
          </div>
        </div>

        <div className="admin-header-actions">
          <div className="admin-user-pill">
            <span className="admin-user-dot"></span>
            <span>{user.name} ({user.email})</span>
          </div>
          <button
            type="button"
            className="admin-action-btn secondary"
            onClick={() => navigate('/')}
            title="View Live Public Website"
          >
            <i className="fa-solid fa-globe" style={{ marginRight: '6px' }}></i>
            Live Site
          </button>
          <button
            type="button"
            className="admin-action-btn danger"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginRight: '6px' }}></i>
            Logout
          </button>
        </div>
      </header>

      {/* NAVIGATION TABS BAR */}
      <nav className="admin-tabs-nav">
        <button
          className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="fa-solid fa-chart-pie"></i>
          Overview
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'notices' ? 'active' : ''}`}
          onClick={() => setActiveTab('notices')}
        >
          <i className="fa-solid fa-bullhorn"></i>
          Notices ({notices.filter((n) => !n.is_archived).length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <i className="fa-solid fa-calendar-days"></i>
          Events ({events.filter((e) => !e.is_archived).length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          <i className="fa-solid fa-images"></i>
          Albums & Gallery
        </button>

        <button
          className={`admin-tab-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('enquiries')}
        >
          <i className="fa-solid fa-envelope-open-text"></i>
          Enquiries ({enquiries.length})
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="admin-main-container">
        {/* ============================================================== */}
        {/* 1. OVERVIEW TAB */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="admin-tab-content">
            {/* KPI STAT CARDS */}
            <div className="admin-kpi-grid">
              <div className="admin-kpi-card" onClick={() => setActiveTab('enquiries')}>
                <div className="kpi-icon-wrap blue">
                  <i className="fa-solid fa-user-graduate"></i>
                </div>
                <div>
                  <div className="kpi-value">{stats.total_enquiries}</div>
                  <div className="kpi-label">Admissions Enquiries</div>
                </div>
              </div>

              <div className="admin-kpi-card" onClick={() => setActiveTab('notices')}>
                <div className="kpi-icon-wrap amber">
                  <i className="fa-solid fa-bullhorn"></i>
                </div>
                <div>
                  <div className="kpi-value">{stats.active_notices}</div>
                  <div className="kpi-label">Active Notices Published</div>
                </div>
              </div>

              <div className="admin-kpi-card" onClick={() => setActiveTab('events')}>
                <div className="kpi-icon-wrap green">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <div>
                  <div className="kpi-value">{stats.upcoming_events}</div>
                  <div className="kpi-label">Institutional Events</div>
                </div>
              </div>

              <div className="admin-kpi-card" onClick={() => setActiveTab('gallery')}>
                <div className="kpi-icon-wrap purple">
                  <i className="fa-solid fa-photo-film"></i>
                </div>
                <div>
                  <div className="kpi-value">{stats.gallery_items}</div>
                  <div className="kpi-label">Gallery Media Items</div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS BANNER */}
            <div className="admin-quick-shortcuts-panel">
              <h3 className="section-title">Administrative Shortcuts</h3>
              <div className="shortcuts-row">
                <button
                  type="button"
                  className="shortcut-chip"
                  onClick={() => {
                    setActiveTab('notices');
                    handleOpenNoticeModal();
                  }}
                >
                  <i className="fa-solid fa-circle-plus"></i>
                  Publish New Notice
                </button>
                <button
                  type="button"
                  className="shortcut-chip"
                  onClick={() => {
                    setActiveTab('events');
                    handleOpenEventModal();
                  }}
                >
                  <i className="fa-solid fa-calendar-plus"></i>
                  Schedule Event
                </button>
                <button
                  type="button"
                  className="shortcut-chip"
                  onClick={() => {
                    setActiveTab('gallery');
                    setGalleryModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  Upload Photo / Video
                </button>

              </div>
            </div>

            {/* RECENT ENQUIRIES PREVIEW */}
            <div className="admin-card-section">
              <div className="section-header-flex">
                <h3 className="section-title">Recent Admissions Enquiries</h3>
                <button
                  type="button"
                  className="admin-link-btn"
                  onClick={() => setActiveTab('enquiries')}
                >
                  View All ({enquiries.length}) &rarr;
                </button>
              </div>

              {stats.recent_enquiries && stats.recent_enquiries.length > 0 ? (
                <div className="admin-table-scroll">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Parent Name</th>
                        <th>Student Name</th>
                        <th>Grade</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recent_enquiries.map((enq) => (
                        <tr key={enq.id}>
                          <td>{enq.created_at ? enq.created_at.split(' ')[0] : 'Today'}</td>
                          <td style={{ fontWeight: 600 }}>{enq.parent_name}</td>
                          <td>{enq.student_name}</td>
                          <td>
                            <span className="badge-grade">{enq.grade}</span>
                          </td>
                          <td>
                            <a href={`tel:${enq.parent_phone}`} style={{ color: '#0B1B3A', fontWeight: 600 }}>
                              {enq.parent_phone}
                            </a>
                          </td>
                          <td>{enq.parent_email}</td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="icon-action-btn"
                              title="View Details"
                              onClick={() => setSelectedEnquiry(enq)}
                            >
                              <i className="fa-solid fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="empty-state-text">No recent enquiries received yet.</p>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. NOTICES MANAGEMENT TAB */}
        {/* ============================================================== */}
        {activeTab === 'notices' && (
          <div className="admin-tab-content">
            <div className="section-header-flex">
              <div>
                <h2 className="tab-main-heading">Notices & Circulars Management</h2>
                <p className="tab-sub-heading">
                  Create, edit, archive, and publish official school notices with PDF and image attachments.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="admin-action-btn secondary"
                  style={{
                    background: '#F8FAFC',
                    border: '1.5px solid #CBD5E1',
                    color: '#0B1B3A',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                  onClick={() => setCategoryModalOpen(true)}
                >
                  <i className="fa-solid fa-tags" style={{ marginRight: '6px', color: '#D4AF37' }}></i>
                  Manage Categories
                </button>
                <button
                  type="button"
                  className="admin-action-btn primary"
                  onClick={() => handleOpenNoticeModal()}
                >
                  <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>
                  Add Notice
                </button>
              </div>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="admin-filter-controls">
              <div className="search-input-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search notices by title or content..."
                  value={noticeSearch}
                  onChange={(e) => setNoticeSearch(e.target.value)}
                />
              </div>

              <div className="category-filter-pills" style={{ alignItems: 'center' }}>
                <button
                  type="button"
                  className={`cat-pill ${noticeCategoryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setNoticeCategoryFilter('all')}
                >
                  ALL
                </button>
                {noticeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`cat-pill ${noticeCategoryFilter === cat.id ? 'active' : ''}`}
                    onClick={() => setNoticeCategoryFilter(cat.id)}
                  >
                    {cat.label.toUpperCase()}
                  </button>
                ))}
                <button
                  type="button"
                  className="cat-pill"
                  style={{
                    borderStyle: 'dashed',
                    borderColor: '#D4AF37',
                    color: '#B8860B',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Create new category filter pill"
                  onClick={() => setCategoryModalOpen(true)}
                >
                  <i className="fa-solid fa-plus" style={{ fontSize: '0.7rem' }}></i>
                  NEW CATEGORY
                </button>
              </div>
            </div>

            {/* NOTICES LIST TABLE */}
            {noticesLoading ? (
              <div className="loading-spinner">Loading notices...</div>
            ) : filteredNotices.length === 0 ? (
              <div className="admin-empty-box" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <i className="fa-solid fa-bullhorn" style={{ fontSize: '2.4rem', color: '#CBD5E1', marginBottom: '12px' }}></i>
                <p style={{ fontWeight: 600, color: '#0B1B3A', margin: 0, fontSize: '1rem' }}>No notices currently published.</p>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '6px' }}>Click "Add Notice" to publish your first circular or announcement.</p>
                <button
                  type="button"
                  className="admin-action-btn primary"
                  style={{ marginTop: '16px' }}
                  onClick={() => handleOpenNoticeModal()}
                >
                  <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>
                  Create First Notice
                </button>
              </div>
            ) : (
              <div className="admin-table-scroll">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '120px' }}>Date</th>
                      <th>Title & Subject</th>
                      <th style={{ width: '130px' }}>Category</th>
                      <th style={{ width: '140px' }}>Attachment</th>
                      <th style={{ width: '100px', textAlign: 'center' }}>Status</th>
                      <th style={{ width: '140px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotices.map((n) => (
                      <tr key={n.id} style={{ opacity: n.is_archived ? 0.65 : 1 }}>
                        <td style={{ fontWeight: 600 }}>{n.notice_date}</td>
                        <td>
                          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.98rem' }}>
                            {n.title}
                          </div>
                          {n.description && (
                            <div className="truncate-text" style={{ fontSize: '0.82rem', color: '#64748B' }}>
                              {n.description}
                            </div>
                          )}
                        </td>
                        <td>
                          <span className={`badge-cat ${n.category || 'general'}`}>
                            {n.category || 'General'}
                          </span>
                        </td>
                        <td>
                          {n.attachment_path ? (
                            <a
                              href={`${API_BASE}${n.attachment_path}`}
                              target="_blank"
                              rel="noreferrer"
                              className="attachment-link-chip"
                            >
                              <i className="fa-solid fa-paperclip"></i>
                              {n.attachment_name || 'View File'}
                            </a>
                          ) : (
                            <span style={{ color: '#94A3B8', fontSize: '0.82rem' }}>None</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`status-pill ${n.is_archived ? 'archived' : 'active'}`}>
                            {n.is_archived ? 'Archived' : 'Active'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <button
                              type="button"
                              className="icon-action-btn"
                              title="Edit Notice"
                              onClick={() => handleOpenNoticeModal(n)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              type="button"
                              className="icon-action-btn"
                              title={n.is_archived ? 'Unarchive' : 'Archive'}
                              onClick={() => handleToggleNoticeArchive(n)}
                            >
                              <i className={`fa-solid ${n.is_archived ? 'fa-box-open' : 'fa-box-archive'}`}></i>
                            </button>
                            <button
                              type="button"
                              className="icon-action-btn delete"
                              title="Delete Notice"
                              onClick={() => handleDeleteNotice(n.id)}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. EVENTS MANAGEMENT TAB */}
        {/* ============================================================== */}
        {activeTab === 'events' && (
          <div className="admin-tab-content">
            <div className="section-header-flex">
              <div>
                <h2 className="tab-main-heading">School Events & Calendar</h2>
                <p className="tab-sub-heading">
                  Manage sports meets, annual days, exhibitions, ceremonies, and examinations.
                </p>
              </div>
              <button
                type="button"
                className="admin-action-btn primary"
                onClick={() => handleOpenEventModal()}
              >
                <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>
                Schedule Event
              </button>
            </div>

            {eventsLoading ? (
              <div className="loading-spinner">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="admin-empty-box">
                <i className="fa-solid fa-calendar-xmark"></i>
                <p>No events scheduled. Click "Schedule Event" to add one.</p>
              </div>
            ) : (
              <div className="admin-table-scroll">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '130px' }}>Date</th>
                      <th style={{ width: '140px' }}>Time</th>
                      <th>Event Title</th>
                      <th>Venue</th>
                      <th style={{ width: '100px', textAlign: 'center' }}>Status</th>
                      <th style={{ width: '130px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev.id} style={{ opacity: ev.is_archived ? 0.6 : 1 }}>
                        <td style={{ fontWeight: 600 }}>{ev.event_date}</td>
                        <td style={{ color: '#475569', fontSize: '0.9rem' }}>{ev.event_time || 'All Day'}</td>
                        <td>
                          <div style={{ fontWeight: 600, color: '#0F172A' }}>{ev.title}</div>
                          {ev.description && (
                            <div className="truncate-text" style={{ fontSize: '0.82rem', color: '#64748B' }}>
                              {ev.description}
                            </div>
                          )}
                        </td>
                        <td>{ev.venue || 'School Campus'}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`status-pill ${ev.is_archived ? 'archived' : 'active'}`}>
                            {ev.is_archived ? 'Concluded' : 'Upcoming'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <button
                              type="button"
                              className="icon-action-btn"
                              title="Edit Event"
                              onClick={() => handleOpenEventModal(ev)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              type="button"
                              className="icon-action-btn"
                              title={ev.is_archived ? 'Restore Event' : 'Archive Event'}
                              onClick={() => handleToggleEventArchive(ev)}
                            >
                              <i className={`fa-solid ${ev.is_archived ? 'fa-arrow-rotate-left' : 'fa-box-archive'}`}></i>
                            </button>
                            <button
                              type="button"
                              className="icon-action-btn delete"
                              title="Delete Event"
                              onClick={() => handleDeleteEvent(ev.id)}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. GALLERY MANAGEMENT TAB */}
        {/* ============================================================== */}
        {activeTab === 'gallery' && (
          <div className="admin-tab-content">
            <div className="section-header-flex">
              <div>
                <h2 className="tab-main-heading">Photo & Video Gallery CMS</h2>
                <p className="tab-sub-heading">
                  Manage album-based photos, YouTube videos, and arrange display order.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="admin-action-btn secondary"
                  onClick={() => setAlbumManageModalOpen(true)}
                >
                  <i className="fa-solid fa-layer-group" style={{ marginRight: '6px', color: '#D4AF37' }}></i>
                  Manage Categories
                </button>
                <button
                  type="button"
                  className="admin-action-btn primary"
                  disabled={galleryAlbums.length === 0}
                  onClick={() => {
                    setGalleryFormData({ title: '', media_url: '', video_url: '' });
                    setGalleryModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>
                  Add Media to Album
                </button>
              </div>
            </div>

            {/* ALBUM SELECTOR TABS */}
            <div className="admin-album-tabs-bar" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              {galleryAlbums.map((alb) => (
                <button
                  key={alb.slug}
                  type="button"
                  className={`album-tab-chip ${selectedAlbum === alb.slug ? 'active' : ''}`}
                  onClick={() => setSelectedAlbum(alb.slug)}
                >
                  <span className="album-title">{alb.title}</span>
                  <span className="album-count">{alb.item_count || 0}</span>
                </button>
              ))}
              <button
                type="button"
                className="album-tab-chip"
                style={{
                  background: '#F1F5F9',
                  border: '1.5px dashed #94A3B8',
                  color: '#0B1B3D',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                onClick={() => setAlbumManageModalOpen(true)}
                title="Create or manage gallery categories"
              >
                <i className="fa-solid fa-plus" style={{ marginRight: '5px', color: '#D4AF37' }}></i>
                New Category
              </button>
            </div>

            {/* GALLERY ITEMS GRID */}
            {galleryLoading ? (
              <div className="loading-spinner">Loading gallery media...</div>
            ) : galleryItems.length === 0 ? (
              <div className="admin-empty-box">
                <i className="fa-solid fa-images"></i>
                <p>No photos or videos in this album yet.</p>
                <button
                  type="button"
                  className="admin-action-btn primary"
                  style={{ marginTop: '12px' }}
                  onClick={() => setGalleryModalOpen(true)}
                >
                  Upload First Image / Add Video
                </button>
              </div>
            ) : (
              <div className="gallery-admin-grid">
                {galleryItems.map((item, idx) => (
                  <div key={item.id} className="gallery-admin-card">
                    <div className="card-media-wrap">
                      {item.item_type === 'video' ? (
                        <div className="video-thumb-placeholder">
                          <i className="fa-brands fa-youtube video-play-icon"></i>
                          <span className="video-badge">VIDEO LINK</span>
                        </div>
                      ) : (
                        <img
                          src={
                            item.media_url.startsWith('http')
                              ? item.media_url
                              : `${API_BASE}${item.media_url}`
                          }
                          alt={item.title || 'Heritage Media'}
                          className="gallery-admin-img"
                        />
                      )}
                      <span className="order-badge">#{idx + 1}</span>
                    </div>

                    <div className="card-body">
                      <div className="card-title truncate-text">{item.title || 'Untitled'}</div>
                      <div className="card-actions-row">
                        <div className="reorder-btns">
                          <button
                            type="button"
                            className="reorder-btn"
                            disabled={idx === 0}
                            title="Move Left / Earlier"
                            onClick={() => handleReorderGalleryItem(item.id, 'up')}
                          >
                            <i className="fa-solid fa-arrow-left"></i>
                          </button>
                          <button
                            type="button"
                            className="reorder-btn"
                            disabled={idx === galleryItems.length - 1}
                            title="Move Right / Later"
                            onClick={() => handleReorderGalleryItem(item.id, 'down')}
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="icon-action-btn delete"
                          title="Delete from album"
                          onClick={() => handleDeleteGalleryItem(item.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}



        {/* ============================================================== */}
        {/* 6. ENQUIRIES TAB */}
        {/* ============================================================== */}
        {activeTab === 'enquiries' && (
          <div className="admin-tab-content">
            <div className="section-header-flex">
              <div>
                <h2 className="tab-main-heading">Parent Admissions Enquiries</h2>
                <p className="tab-sub-heading">
                  All admissions submissions from the online website enquiry form.
                </p>
              </div>
              <div className="search-input-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Filter by parent, phone, student, or grade..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                />
              </div>
            </div>

            {enquiriesLoading ? (
              <div className="loading-spinner">Loading enquiries...</div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="admin-empty-box">
                <i className="fa-solid fa-inbox"></i>
                <p>No enquiries found matching your query.</p>
              </div>
            ) : (
              <div className="admin-table-scroll">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '120px' }}>Date</th>
                      <th>Parent Name</th>
                      <th>Student Name</th>
                      <th>Grade Applying</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Academic Year</th>
                      <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((enq) => (
                      <tr key={enq.id}>
                        <td>{enq.created_at ? enq.created_at.split(' ')[0] : 'Today'}</td>
                        <td style={{ fontWeight: 600 }}>{enq.parent_name}</td>
                        <td>{enq.student_name}</td>
                        <td>
                          <span className="badge-grade">{enq.grade}</span>
                        </td>
                        <td>
                          <a href={`tel:${enq.parent_phone}`} style={{ color: '#0B1B3A', fontWeight: 600 }}>
                            {enq.parent_phone}
                          </a>
                        </td>
                        <td>{enq.parent_email}</td>
                        <td>{enq.academic_year || '2026-2027'}</td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <button
                              type="button"
                              className="icon-action-btn"
                              title="View Details"
                              onClick={() => setSelectedEnquiry(enq)}
                            >
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            <button
                              type="button"
                              className="icon-action-btn delete"
                              title="Delete Enquiry"
                              onClick={() => handleDeleteEnquiry(enq.id)}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODAL: ADD / EDIT NOTICE */}
      {/* ============================================================== */}
      {noticeModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setNoticeModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingNotice ? 'Edit Notice' : 'Publish New Notice'}</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setNoticeModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="modal-form">
              <div className="form-group">
                <label>Notice Subject / Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Admissions Open for Session 2026–2027"
                  value={noticeFormData.title}
                  onChange={(e) =>
                    setNoticeFormData({ ...noticeFormData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Notice Date (DD/MM/YYYY)</label>
                  <input
                    type="text"
                    value={noticeFormData.notice_date}
                    onChange={(e) =>
                      setNoticeFormData({ ...noticeFormData, notice_date: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ margin: 0 }}>Category</label>
                    <button
                      type="button"
                      onClick={() => setInlineNewCatOpen(!inlineNewCatOpen)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#B8860B',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {inlineNewCatOpen ? '← Choose Existing' : '+ Add New Category'}
                    </button>
                  </div>

                  {inlineNewCatOpen ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="e.g. Sports, Cultural, Tender..."
                        value={inlineCatName}
                        onChange={(e) => setInlineCatName(e.target.value)}
                        style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem' }}
                      />
                      <button
                        type="button"
                        className="admin-action-btn primary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                        onClick={async () => {
                          const trimmed = inlineCatName.trim();
                          if (!trimmed) return;
                          const slug = trimmed
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, '');
                          if (!noticeCategories.some((c) => c.id === slug)) {
                            const updated = [...noticeCategories, { id: slug, label: trimmed }];
                            await saveNoticeCategories(updated);
                          }
                          setNoticeFormData({ ...noticeFormData, category: slug });
                          setInlineCatName('');
                          setInlineNewCatOpen(false);
                        }}
                      >
                        Save & Select
                      </button>
                    </div>
                  ) : (
                    <select
                      value={noticeFormData.category}
                      onChange={(e) => {
                        if (e.target.value === '__add_new__') {
                          setInlineNewCatOpen(true);
                        } else {
                          setNoticeFormData({ ...noticeFormData, category: e.target.value });
                        }
                      }}
                    >
                      {noticeCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                      <option value="__add_new__">+ Create New Category...</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Notice Description / Details</label>
                <textarea
                  rows="4"
                  placeholder="Enter full notice content, schedule, or instructions..."
                  value={noticeFormData.description}
                  onChange={(e) =>
                    setNoticeFormData({ ...noticeFormData, description: e.target.value })
                  }
                ></textarea>
              </div>

              {/* ATTACHMENT */}
              <div className="form-group">
                <label>Upload PDF / Image Attachment</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={handleNoticeFileUpload}
                  />
                  <button
                    type="button"
                    className="admin-action-btn secondary"
                    disabled={noticeUploadLoading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="fa-solid fa-cloud-arrow-up" style={{ marginRight: '6px' }}></i>
                    {noticeUploadLoading ? 'Uploading...' : 'Choose File (PDF/Image)'}
                  </button>
                  {noticeFormData.attachment_name && (
                    <span style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 600 }}>
                      <i className="fa-solid fa-file-circle-check" style={{ color: '#059669', marginRight: '4px' }}></i>
                      {noticeFormData.attachment_name}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="noticeArchiveCheck"
                  checked={noticeFormData.is_archived}
                  onChange={(e) =>
                    setNoticeFormData({ ...noticeFormData, is_archived: e.target.checked })
                  }
                />
                <label htmlFor="noticeArchiveCheck" style={{ margin: 0, cursor: 'pointer' }}>
                  Archive this notice (hide from primary active feed)
                </label>
              </div>

              <div className="modal-footer-btns">
                <button
                  type="button"
                  className="admin-action-btn secondary"
                  onClick={() => setNoticeModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn primary">
                  {editingNotice ? 'Update Notice' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD / EDIT EVENT */}
      {/* ============================================================== */}
      {eventModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setEventModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingEvent ? 'Edit Event' : 'Schedule New Event'}</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setEventModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="modal-form">
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Annual Sports Meet 2026"
                  value={eventFormData.title}
                  onChange={(e) =>
                    setEventFormData({ ...eventFormData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Event Date (e.g. 15/12/2026)</label>
                  <input
                    type="text"
                    value={eventFormData.event_date}
                    onChange={(e) =>
                      setEventFormData({ ...eventFormData, event_date: e.target.value })
                    }
                    placeholder="DD/MM/YYYY"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Event Timing</label>
                  <input
                    type="text"
                    value={eventFormData.event_time}
                    onChange={(e) =>
                      setEventFormData({ ...eventFormData, event_time: e.target.value })
                    }
                    placeholder="e.g. 9:30 AM – 2:00 PM"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Venue / Location</label>
                <input
                  type="text"
                  value={eventFormData.venue}
                  onChange={(e) =>
                    setEventFormData({ ...eventFormData, venue: e.target.value })
                  }
                  placeholder="e.g. Academy Main Grounds"
                />
              </div>

              <div className="form-group">
                <label>Event Description & Highlights</label>
                <textarea
                  rows="3"
                  value={eventFormData.description}
                  onChange={(e) =>
                    setEventFormData({ ...eventFormData, description: e.target.value })
                  }
                  placeholder="Details for students, parents, and guests..."
                ></textarea>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="eventArchiveCheck"
                  checked={eventFormData.is_archived}
                  onChange={(e) =>
                    setEventFormData({ ...eventFormData, is_archived: e.target.checked })
                  }
                />
                <label htmlFor="eventArchiveCheck" style={{ margin: 0, cursor: 'pointer' }}>
                  Mark event as concluded / archive
                </label>
              </div>

              <div className="modal-footer-btns">
                <button
                  type="button"
                  className="admin-action-btn secondary"
                  onClick={() => setEventModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn primary">
                  {editingEvent ? 'Save Changes' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD GALLERY ITEM */}
      {/* ============================================================== */}
      {galleryModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setGalleryModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                Add to Album:{' '}
                <span style={{ color: '#D4AF37' }}>
                  {galleryAlbums.find((a) => a.slug === selectedAlbum)?.title || selectedAlbum}
                </span>
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setGalleryModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveGalleryItem} className="modal-form">
              {/* MEDIA TYPE SWITCH */}
              <div className="media-type-selector">
                <button
                  type="button"
                  className={`type-btn ${galleryMediaType === 'image' ? 'active' : ''}`}
                  onClick={() => setGalleryMediaType('image')}
                >
                  <i className="fa-solid fa-image"></i> Photo Upload
                </button>
                <button
                  type="button"
                  className={`type-btn ${galleryMediaType === 'video' ? 'active' : ''}`}
                  onClick={() => setGalleryMediaType('video')}
                >
                  <i className="fa-brands fa-youtube"></i> YouTube Video Link
                </button>
              </div>

              <div className="form-group">
                <label>Caption / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Prize Distribution Ceremony or Folk Dance Performance"
                  value={galleryFormData.title}
                  onChange={(e) =>
                    setGalleryFormData({ ...galleryFormData, title: e.target.value })
                  }
                />
              </div>

              {galleryMediaType === 'image' ? (
                <div className="form-group">
                  <label>Select Photo (JPG, PNG, WEBP)</label>
                  <input
                    type="file"
                    ref={galleryFileRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleGalleryImageUpload}
                  />
                  <div style={{ marginTop: '6px' }}>
                    <button
                      type="button"
                      className="admin-action-btn secondary"
                      disabled={galleryUploadLoading}
                      onClick={() => galleryFileRef.current?.click()}
                    >
                      <i className="fa-solid fa-upload" style={{ marginRight: '6px' }}></i>
                      {galleryUploadLoading ? 'Uploading image...' : 'Choose Image File'}
                    </button>
                  </div>
                  {galleryFormData.media_url && (
                    <div style={{ marginTop: '10px' }}>
                      <img
                        src={
                          galleryFormData.media_url.startsWith('http')
                            ? galleryFormData.media_url
                            : `${API_BASE}${galleryFormData.media_url}`
                        }
                        alt="Preview"
                        style={{ height: '90px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="form-group">
                  <label>YouTube Video Link</label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={galleryFormData.video_url}
                    onChange={(e) =>
                      setGalleryFormData({ ...galleryFormData, video_url: e.target.value })
                    }
                  />
                  <small style={{ color: '#64748B', display: 'block', marginTop: '4px' }}>
                    Paste standard or share link from YouTube.
                  </small>
                </div>
              )}

              <div className="modal-footer-btns">
                <button
                  type="button"
                  className="admin-action-btn secondary"
                  onClick={() => setGalleryModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn primary">
                  Save to Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: VIEW ENQUIRY DETAILS */}
      {/* ============================================================== */}
      {selectedEnquiry && (
        <div className="admin-modal-overlay" onClick={() => setSelectedEnquiry(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Admissions Enquiry Details</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedEnquiry(null)}
              >
                &times;
              </button>
            </div>

            <div className="enquiry-detail-body">
              <div className="detail-row">
                <span className="detail-label">Parent / Guardian Name:</span>
                <span className="detail-val">{selectedEnquiry.parent_name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Student Name:</span>
                <span className="detail-val">{selectedEnquiry.student_name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Grade Applying For:</span>
                <span className="detail-val">
                  <span className="badge-grade">{selectedEnquiry.grade}</span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Academic Session:</span>
                <span className="detail-val">{selectedEnquiry.academic_year || '2026-2027'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Contact Phone:</span>
                <span className="detail-val">
                  <a href={`tel:${selectedEnquiry.parent_phone}`}>{selectedEnquiry.parent_phone}</a>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email Address:</span>
                <span className="detail-val">
                  <a href={`mailto:${selectedEnquiry.parent_email}`}>{selectedEnquiry.parent_email}</a>
                </span>
              </div>
              <div className="detail-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="detail-label" style={{ marginBottom: '6px' }}>Message / Queries:</span>
                <div className="detail-message-box">
                  {selectedEnquiry.message || 'No additional message provided.'}
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-label">Submission Timestamp:</span>
                <span className="detail-val">{selectedEnquiry.created_at || 'Just now'}</span>
              </div>
            </div>

            <div className="modal-footer-btns">
              <button
                type="button"
                className="admin-action-btn secondary"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="admin-action-btn danger"
                onClick={() => {
                  handleDeleteEnquiry(selectedEnquiry.id);
                  setSelectedEnquiry(null);
                }}
              >
                Delete Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ============================================================== */}
      {/* MODAL: MANAGE NOTICE CATEGORIES & FILTER PILLS */}
      {/* ============================================================== */}
      {categoryModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setCategoryModalOpen(false)}>
          <div
            className="admin-modal-card"
            style={{ maxWidth: '580px', width: '92%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(212, 175, 55, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#B8860B'
                  }}
                >
                  <i className="fa-solid fa-tags"></i>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Notice Category Pills Manager</h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                    Create, edit, and organize filter tabs shown on the website & admin dashboard
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setCategoryModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              {/* Add New Category Pill Form */}
              <form
                onSubmit={handleAddCategory}
                style={{
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px'
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#0B1B3A',
                    marginBottom: '8px'
                  }}
                >
                  Create New Category Pill
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="e.g. Sports, Cultural, Tender, Holidays, Events..."
                    value={newCatLabel}
                    onChange={(e) => setNewCatLabel(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      background: '#FFFFFF'
                    }}
                  />
                  <button
                    type="submit"
                    className="admin-action-btn primary"
                    disabled={categorySaving}
                    style={{ whiteSpace: 'nowrap', padding: '9px 16px' }}
                  >
                    <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>
                    {categorySaving ? 'Saving...' : 'Add Pill'}
                  </button>
                </div>
                <small style={{ color: '#64748B', display: 'block', marginTop: '6px', fontSize: '0.76rem' }}>
                  This pill will immediately appear on the Public Noticeboard and Admin Filter pills bar.
                </small>
              </form>

              {/* Active Category Pills List */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B1B3A' }}>
                    Active Category Pills ({noticeCategories.length})
                  </span>
                  <span style={{ fontSize: '0.76rem', color: '#64748B' }}>
                    Click trash icon to remove
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    maxHeight: '280px',
                    overflowY: 'auto',
                    paddingRight: '4px'
                  }}
                >
                  {noticeCategories.map((cat) => {
                    const noticeCount = notices.filter((n) => {
                      const nc = (n.category || '').toLowerCase().trim();
                      const cid = cat.id.toLowerCase().trim();
                      return (
                        nc === cid ||
                        (cid === 'examination' && (nc === 'exam' || nc === 'examinations')) ||
                        (cid === 'admissions' && nc === 'admission')
                      );
                    }).length;

                    return (
                      <div
                        key={cat.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: '#FFFFFF',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span
                            style={{
                              background: '#0B1B3A',
                              color: '#FFFFFF',
                              padding: '5px 12px',
                              borderRadius: '999px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              letterSpacing: '0.5px'
                            }}
                          >
                            {cat.label.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                            slug: <code style={{ color: '#0B1B3A', background: '#F1F5F9', padding: '1px 5px', borderRadius: '3px' }}>{cat.id}</code>
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span
                            style={{
                              fontSize: '0.74rem',
                              background: '#F1F5F9',
                              color: '#475569',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontWeight: 600
                            }}
                          >
                            {noticeCount} notice{noticeCount === 1 ? '' : 's'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat.id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: 'none',
                              color: '#DC2626',
                              cursor: 'pointer',
                              padding: '6px 8px',
                              borderRadius: '4px',
                              fontSize: '0.82rem',
                              transition: 'all 0.2s ease'
                            }}
                            title={`Remove category "${cat.label}"`}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className="modal-footer-btns"
              style={{
                borderTop: '1px solid #E2E8F0',
                padding: '14px 20px',
                display: 'flex',
                justifyContent: 'flex-end',
                background: '#F8FAFC',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px'
              }}
            >
              <button
                type="button"
                className="admin-action-btn secondary"
                onClick={() => setCategoryModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: MANAGE GALLERY CATEGORIES (ALBUMS) */}
      {/* ============================================================== */}
      {albumManageModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setAlbumManageModalOpen(false)}>
          <div
            className="admin-modal-card"
            style={{ maxWidth: '640px', width: '92%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: 'rgba(212, 175, 55, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#B8860B',
                    fontSize: '1.1rem'
                  }}
                >
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Manage Gallery Categories</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>
                    Create, edit, and organize albums displayed in the photo gallery
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setAlbumManageModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              {/* Add New Album Form */}
              <form
                onSubmit={handleCreateAlbum}
                style={{
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px'
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#0B1B3D',
                    marginBottom: '8px'
                  }}
                >
                  + Add New Gallery Category
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Category / Album Title (e.g. Science Exhibition, Sports Meet 2026...)"
                    value={newAlbumTitle}
                    onChange={(e) => setNewAlbumTitle(e.target.value)}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      background: '#FFFFFF'
                    }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Short description (optional, e.g. Annual science fair and dynamic prototypes)"
                    value={newAlbumDesc}
                    onChange={(e) => setNewAlbumDesc(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.85rem',
                      outline: 'none',
                      background: '#FFFFFF'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="submit"
                      className="admin-action-btn primary"
                      disabled={albumSaving}
                      style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                    >
                      <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>
                      {albumSaving ? 'Creating...' : 'Create Category'}
                    </button>
                  </div>
                </div>
              </form>

              {/* Existing Categories List */}
              <div>
                <h4 style={{ fontSize: '0.92rem', color: '#0B1B3D', fontWeight: 700, marginBottom: '10px' }}>
                  Existing Categories ({galleryAlbums.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                  {galleryAlbums.map((alb) => (
                    <div
                      key={alb.id || alb.slug}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, color: '#0B1B3D', fontSize: '0.92rem' }}>
                            {alb.title}
                          </span>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              background: '#F1F5F9',
                              color: '#64748B',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: 600
                            }}
                          >
                            {alb.item_count || 0} photo{(alb.item_count || 0) === 1 ? '' : 's'}
                          </span>
                        </div>
                        {alb.description && (
                          <span style={{ fontSize: '0.78rem', color: '#64748B', maxWidth: '380px' }} className="truncate-text">
                            {alb.description}
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAlbum({ ...alb });
                          }}
                          style={{
                            background: '#F1F5F9',
                            border: 'none',
                            color: '#0B1B3D',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            borderRadius: '5px',
                            fontSize: '0.82rem'
                          }}
                          title={`Edit category "${alb.title}"`}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAlbum(alb.id, alb.title)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: 'none',
                            color: '#DC2626',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            borderRadius: '5px',
                            fontSize: '0.82rem'
                          }}
                          title={`Delete category "${alb.title}"`}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="modal-footer-btns"
              style={{
                borderTop: '1px solid #E2E8F0',
                padding: '14px 20px',
                display: 'flex',
                justifyContent: 'flex-end',
                background: '#F8FAFC',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px'
              }}
            >
              <button
                type="button"
                className="admin-action-btn secondary"
                onClick={() => setAlbumManageModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: EDIT GALLERY CATEGORY */}
      {/* ============================================================== */}
      {editingAlbum && (
        <div className="admin-modal-overlay" onClick={() => setEditingAlbum(null)}>
          <div
            className="admin-modal-card"
            style={{ maxWidth: '500px', width: '92%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Edit Gallery Category</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setEditingAlbum(null)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateAlbum} className="modal-form" style={{ padding: '20px' }}>
              <div className="form-group">
                <label>Category Title *</label>
                <input
                  type="text"
                  value={editingAlbum.title || ''}
                  onChange={(e) =>
                    setEditingAlbum({ ...editingAlbum, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Category Description</label>
                <textarea
                  rows="3"
                  value={editingAlbum.description || ''}
                  onChange={(e) =>
                    setEditingAlbum({ ...editingAlbum, description: e.target.value })
                  }
                  placeholder="Short description of this photo album category..."
                ></textarea>
              </div>

              <div className="modal-footer-btns" style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  className="admin-action-btn secondary"
                  onClick={() => setEditingAlbum(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-action-btn primary"
                  disabled={albumSaving}
                >
                  {albumSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}