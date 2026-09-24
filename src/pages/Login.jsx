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
      setError('Connection to the backend failed. Is the server up and running?');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <aside className="login-brand-panel">
          <h2>Learn with purpose.<br /><em>Lead with character.</em></h2>
          <p>A thoughtful learning community shaped by curiosity, discipline and heritage.</p>
          <div className="brand-rule" />
          <span className="brand-motto">The Rabindra Bharati Heritage Day School</span>
        </aside>

        <main className="login-box">
          <div className="login-heading">
            <span className="eyebrow">Secure portal</span>
            <h1>Welcome back</h1>
            <p className="subtitle">Sign in to continue to your school dashboard.</p>
          </div>

        <div className="quick-fill-box">
          <div className="quick-fill-heading">
            <span>Admin access</span>
            <button
              type="button"
              onClick={handleQuickFillAdmin}
            >
              Use demo login
            </button>
          </div>
          <div className="quick-fill-details">
            <span>admin@heritage.com</span>
            <span>admin123</span>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@heritage.com"
            required
            autoComplete="username"
          />

          <label htmlFor="login-password">Password</label>
          <div className="password-field">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <p className="back-home">
          <Link to="/">← Back to Home</Link>
        </p>
        </main>
      </div>
    </div>
  );
}

export default Login;