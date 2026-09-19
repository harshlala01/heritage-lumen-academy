import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000';
const sections = ['banners', 'facilities', 'faculty', 'gallery', 'activities'];

export default function ContentManager() {
  const [section, setSection] = useState('banners');
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!token || !user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    loadItems(section);
  }, [navigate, section]);

  const loadItems = async (selectedSection) => {
    try {
      const response = await fetch(`${API_URL}/api/content/${selectedSection}`);
      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage('Unable to load content.');
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile || null);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please choose an image.');
      return;
    }

    setLoading(true);
    setMessage('');
    const token = localStorage.getItem('token');
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('section', section);
      const uploadResponse = await fetch(`${API_URL}/api/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData
      });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadResult.message || 'Image upload failed');

      const contentResponse = await fetch(`${API_URL}/api/admin/content`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ section, title, subtitle, image_path: uploadResult.path })
      });
      const contentResult = await contentResponse.json();
      if (!contentResponse.ok) throw new Error(contentResult.message || 'Content save failed');

      setTitle('');
      setSubtitle('');
      setFile(null);
      setPreview('');
      event.target.reset();
      setMessage('Content saved successfully.');
      loadItems(section);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this content item?')) return;
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/admin/content/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) setItems(items.filter((item) => item.id !== id));
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <button type="button" onClick={() => navigate('/admin/dashboard')} style={styles.backButton}>
              Back to dashboard
            </button>
            <h1 style={styles.heading}>Manage Content</h1>
          </div>
          <button type="button" onClick={() => navigate('/')} style={styles.secondaryButton}>View homepage</button>
        </header>

        <nav style={styles.tabs} aria-label="Content sections">
          {sections.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setSection(item)}
              style={{ ...styles.tab, ...(section === item ? styles.activeTab : {}) }}
            >
              {item}
            </button>
          ))}
        </nav>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Add {section}</h2>
          <label style={styles.label}>Title<input value={title} onChange={(event) => setTitle(event.target.value)} style={styles.input} required /></label>
          <label style={styles.label}>Subtitle<textarea value={subtitle} onChange={(event) => setSubtitle(event.target.value)} style={{ ...styles.input, minHeight: 90 }} /></label>
          <label style={styles.label}>Image<input type="file" accept="image/png,image/jpeg,image/gif,image/webp" onChange={handleFileChange} style={styles.input} required /></label>
          {preview && <img src={preview} alt="Selected preview" style={styles.preview} />}
          <button type="submit" disabled={loading} style={styles.submit}>{loading ? 'Saving...' : 'Upload and save'}</button>
          {message && <p style={styles.message}>{message}</p>}
        </form>

        <section>
          <h2>Existing {section}</h2>
          {items.length === 0 ? <p>No content added yet.</p> : (
            <div style={styles.grid}>
              {items.map((item) => (
                <article key={item.id} style={styles.card}>
                  {item.image_path && <img src={`${API_URL}${item.image_path}`} alt={item.title || section} style={styles.cardImage} />}
                  <div style={styles.cardBody}>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                    <button type="button" onClick={() => handleDelete(item.id)} style={styles.delete}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: { minHeight: '100vh', padding: '40px 20px', background: '#f5f5f5' },
  container: { maxWidth: 1200, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, marginBottom: 24 },
  heading: { color: '#0b1b3a', margin: '8px 0 0' },
  backButton: { border: 0, background: 'none', color: '#0b1b3a', cursor: 'pointer', padding: 0 },
  secondaryButton: { padding: '10px 16px', border: '1px solid #0b1b3a', background: 'white', color: '#0b1b3a', borderRadius: 5, cursor: 'pointer' },
  tabs: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tab: { padding: '10px 16px', border: '1px solid #d0d5dd', background: 'white', borderRadius: 5, cursor: 'pointer', textTransform: 'capitalize' },
  activeTab: { background: '#0b1b3a', color: 'white', borderColor: '#0b1b3a' },
  form: { background: 'white', padding: 24, borderRadius: 8, marginBottom: 36, maxWidth: 680 },
  label: { display: 'block', marginBottom: 16, fontWeight: 600 },
  input: { display: 'block', width: '100%', boxSizing: 'border-box', marginTop: 7, padding: 10, border: '1px solid #ccd2da', borderRadius: 4, font: 'inherit' },
  preview: { display: 'block', width: 220, height: 130, objectFit: 'cover', marginBottom: 16, borderRadius: 5 },
  submit: { padding: '11px 18px', border: 0, background: '#c6952e', color: 'white', borderRadius: 5, cursor: 'pointer', fontWeight: 700 },
  message: { marginBottom: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 },
  card: { background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  cardImage: { display: 'block', width: '100%', height: 170, objectFit: 'cover' },
  cardBody: { padding: 16 },
  delete: { padding: '7px 12px', border: 0, background: '#b42318', color: 'white', borderRadius: 4, cursor: 'pointer' }
};
