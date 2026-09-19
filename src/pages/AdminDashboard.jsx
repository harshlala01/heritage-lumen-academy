import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Enquiries fetch karo
    fetch('http://localhost:5000/api/admin/enquiries', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEnquiries(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yeh enquiry delete karni hai?')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: 40, background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0b1b3a' }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => navigate('/admin/content')} style={manageBtn}>Manage Content</button>
            <button onClick={handleLogout} style={logoutBtn}>Logout</button>
          </div>
        </div>

        <p style={{ fontSize: 16, marginTop: 10 }}>
          Welcome, <b>{user.name}</b> ({user.email})
        </p>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 30 }}>
          <div style={card}>
            <h3>Total Enquiries</h3>
            <p style={num}>{enquiries.length}</p>
          </div>
          
        </div>

        {/* Enquiries Table */}
        <div style={{ marginTop: 30, background: 'white', padding: 20, borderRadius: 10 }}>
          <h2 style={{ color: '#0b1b3a' }}>Admission Enquiries</h2>

          {loading ? (
            <p>Loading...</p>
          ) : enquiries.length === 0 ? (
            <p style={{ color: '#666' }}>Abhi tak koi enquiry nahi aayi.</p>
          ) : (
            <div style={{ overflowX: 'auto', marginTop: 15 }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ background: '#0b1b3a', color: 'white' }}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Parent</th>
                    <th style={thStyle}>Student</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Grade</th>
                    <th style={thStyle}>Year</th>
                    <th style={thStyle}>Message</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e) => (
                    <tr key={e.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={tdStyle}>{e.id}</td>
                      <td style={tdStyle}>{e.parent_name}</td>
                      <td style={tdStyle}>{e.student_name}</td>
                      <td style={tdStyle}>{e.parent_email}</td>
                      <td style={tdStyle}>{e.parent_phone}</td>
                      <td style={tdStyle}>{e.grade}</td>
                      <td style={tdStyle}>{e.academic_year}</td>
                      <td style={{ ...tdStyle, maxWidth: 150, fontSize: 12 }}>
                        {e.message || '-'}
                      </td>
                      <td style={{ ...tdStyle, fontSize: 12 }}>
                        {e.created_at ? e.created_at.slice(0, 10) : '-'}
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => handleDelete(e.id)}
                          style={deleteBtn}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const card = {
  background: 'white',
  padding: 20,
  borderRadius: 10,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};
const num = { fontSize: 32, fontWeight: 'bold', color: '#0b1b3a', marginTop: 10 };
const logoutBtn = {
  padding: '10px 20px',
  background: '#c00',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14
};
const manageBtn = {
  padding: '10px 20px',
  background: '#0b1b3a',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14
};
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { padding: '12px 8px', textAlign: 'left', fontSize: 13 };
const tdStyle = { padding: '10px 8px', fontSize: 13 };
const deleteBtn = {
  padding: '6px 12px',
  background: '#c00',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 12
};

export default AdminDashboard;