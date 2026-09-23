import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleQuickFillAdmin = () => {
    setEmail('admin@heritage.com');
    setPassword('admin123');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed. Check your email or password.');
        setLoading(false);
        return;
      }

      // Token aur user localStorage mein save karo
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Role ke hisaab se redirect
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError('Server se connect nahi ho paya. Backend port 5000 chalu hai?');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Portal Login</h1>
        <p className="subtitle">The Rabindra Bharati Heritage Day School</p>

        {/* Quick Admin Helper Box */}
        <div style={{
          background: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '8px',
          padding: '12px 14px',
          marginBottom: '18px',
          textAlign: 'left',
          fontSize: '0.85rem'
        }}>
          <div style={{ fontWeight: 700, color: '#1E3A8A', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🔑 Admin Credentials:</span>
            <button
              type="button"
              onClick={handleQuickFillAdmin}
              style={{
                background: '#1D4ED8',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '3px 8px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Auto-Fill
            </button>
          </div>
          <div style={{ color: '#1E40AF', fontSize: '0.82rem' }}>
            Email: <b>admin@heritage.com</b><br />
            Password: <b>admin123</b>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@heritage.com"
            required
            autoComplete="username"
          />

          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
              style={{ width: '100%', paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          <button type="submit" disabled={loading} style={{ marginTop: '16px' }}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <p className="back-home">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;