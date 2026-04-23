import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const T = {
  bg:          'var(--color-bg)',
  bgAlt:       'var(--color-secondary)',
  bgCard:      'var(--color-surface)',
  primary:     'var(--color-primary)',
  primaryDark: 'var(--color-primary-dark)',
  accent:      'var(--color-primary-light)',
  textMain:    'var(--color-text-primary)',
  textLight:   'var(--color-text-secondary)',
  border:      'var(--color-border)',
  accent10:    'rgba(155,17,30,0.10)',
  accent40:    'rgba(155,17,30,0.40)',
};

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const userRole = data.role || data.user.role;

      if (userRole !== 'admin') {
        toast.error('Access denied. This is an Admin-only portal.');
        return;
      }

      login(data.user, data.token);
      toast.success(`Welcome back, Administrator!`);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 12, fontSize: 14,
    background: T.bgCard, border: `1px solid ${T.border}`,
    color: T.textMain, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, background: `linear-gradient(135deg, ${T.bg} 0%, ${T.bgAlt} 100%)`,
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        width: '100%', maxWidth: 450, background: T.bgCard, border: `1px solid ${T.border}`,
        borderRadius: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', padding: '48px 40px',
        position: 'relative'
      }}>
        
        <button 
          onClick={() => navigate('/')}
          style={{ 
            position: 'absolute', top: 24, left: 24, background: 'none', border: 'none', 
            color: T.textLight, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600
          }}
        >
          <ArrowBackIcon fontSize="small" /> Back
        </button>

        <div style={{ textAlign: 'center', marginBottom: 32, marginTop: 12 }}>
          <div style={{ 
            width: 56, height: 56, background: T.primary, borderRadius: 14, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: '#fff', margin: '0 auto 16px', boxShadow: `0 8px 16px ${T.accent40}`
          }}>
            <AdminPanelSettingsIcon fontSize="large" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: T.textMain, margin: 0, letterSpacing: '-0.02em' }}>Admin Access</h2>
          <p style={{ color: T.textLight, fontSize: 13, marginTop: 6 }}>Manage the CampusHub ecosystem</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: T.textMain, display: 'block', marginBottom: 8 }}>Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@campusync.co.in"
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = T.primary; e.target.style.boxShadow = `0 0 0 4px ${T.accent10}`; }}
              onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: T.textMain, display: 'block', marginBottom: 8 }}>Security Key</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={e => { e.target.style.borderColor = T.primary; e.target.style.boxShadow = `0 0 0 4px ${T.accent10}`; }}
                onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none'; }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.textLight, display: 'flex', alignItems: 'center' }}
              >
                {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ 
              background: T.primary, color: '#fff', border: 'none', borderRadius: 14, 
              padding: '16px 0', fontSize: 15, fontWeight: 800, 
              cursor: loading ? 'not-allowed' : 'pointer', 
              boxShadow: `0 8px 24px ${T.accent40}`,
              transition: 'all 0.2s', opacity: loading ? 0.75 : 1, marginTop: 8 
            }}
            onMouseOver={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 28px ${T.accent40}`; } }}
            onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 8px 24px ${T.accent40}`; }}
          >
            {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'SIGN IN AS ADMIN'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: T.textLight, marginTop: 32 }}>
          Not an admin? <span onClick={() => navigate('/')} style={{ color: T.primary, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Back to Portal</span>
        </p>
      </div>
    </div>
  );
}
