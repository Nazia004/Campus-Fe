import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../api';
import { useAuth } from '../context/AuthContext';

// ── Theme tokens ──────────────────────────────────────────────────────────────
const T = {
  bg:          '#FAF3E0',
  bgAlt:       '#F5EDD4',
  bgCard:      '#FFFFFF',
  primary:     '#C9A227',
  primaryDark: '#3E2723',
  accent:      '#A67C00',
  textMain:    '#2D2D2D',
  textLight:   '#6D6D6D',
  border:      '#E8DCCB',
  gold10:      'rgba(201,162,39,0.10)',
  gold20:      'rgba(201,162,39,0.20)',
  gold40:      'rgba(201,162,39,0.40)',
};

const ROLES = [
  { key: 'student',   label: 'Student',   icon: <SchoolIcon />,             color: '#C9A227' },
  { key: 'club',      label: 'Club',       icon: <GroupsIcon />,             color: '#C9A227' },
  { key: 'placement', label: 'Placement',  icon: <WorkIcon />,               color: '#C9A227' },
  { key: 'admin',     label: 'Admin',      icon: <AdminPanelSettingsIcon />, color: '#C9A227' },
];

export default function Login() {
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role || 'student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const activeRole = ROLES.find((r) => r.key === role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password, role });
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'club') navigate('/club/dashboard');
      else if (role === 'student') navigate('/student/dashboard');
      else if (role === 'placement') navigate('/placement/dashboard');
      else navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 14,
    background: T.bgCard, border: `1px solid ${T.border}`,
    color: T.textMain, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s',
  };

  return (
    <>
      <style>{`
        @keyframes loginFadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .login-card { animation: loginFadeIn 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        input::placeholder { color: #AAAAAA !important; }
      `}</style>

      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, background: `linear-gradient(135deg, ${T.bg} 0%, ${T.bgAlt} 100%)`,
        position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif',
      }}>
        {/* Soft gold glow — top-left */}
        <div style={{ position: 'absolute', top: -60, left: -60, width: 400, height: 400, background: `radial-gradient(circle, ${T.gold20} 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
        {/* Soft gold glow — bottom-right */}
        <div style={{ position: 'absolute', bottom: -80, right: -60, width: 440, height: 440, background: `radial-gradient(circle, ${T.gold10} 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>

          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: T.textLight, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, marginBottom: 20, padding: 0, transition: 'color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.color = T.primary}
            onMouseOut={e => e.currentTarget.style.color = T.textLight}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to home
          </button>

          {/* Card */}
          <div className="login-card" style={{
            background: T.bgCard, border: `1px solid ${T.border}`,
            borderRadius: 20, padding: 36,
            boxShadow: '0 8px 40px rgba(62,39,35,0.12)',
          }}>
            {/* Header */}
            <div style={{ marginBottom: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SchoolIcon sx={{ fontSize: 20, color: T.primaryDark }} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: T.primaryDark }}>CampusHub</span>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: T.primaryDark, margin: '0 0 5px' }}>Sign in</h1>
              <p style={{ color: T.textLight, fontSize: 13, margin: 0 }}>Select your role and enter your credentials</p>
            </div>

            {/* Role selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, padding: 6, background: T.bgAlt, borderRadius: 14, marginBottom: 22, border: `1px solid ${T.border}` }}>
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '9px 4px', borderRadius: 10, fontSize: 11, fontWeight: 600,
                    border: role === r.key ? `1px solid ${T.gold40}` : '1px solid transparent',
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: role === r.key ? T.bgCard : 'transparent',
                    color: role === r.key ? T.primary : T.textLight,
                    transform: role === r.key ? 'scale(1.04)' : 'none',
                    boxShadow: role === r.key ? '0 2px 8px rgba(62,39,35,0.1)' : 'none',
                  }}
                >
                  {r.icon}
                  {r.label}
                </button>
              ))}
            </div>

            {/* Active role badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 10, marginBottom: 22, background: T.gold10, border: `1px solid ${T.gold40}`, color: T.accent, fontSize: 13, fontWeight: 500 }}>
              {activeRole.icon}
              Signing in as <strong style={{ color: T.primaryDark }}>{activeRole.label}</strong>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.textMain, display: 'block', marginBottom: 6 }}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={role === 'admin' ? 'admin@admin.com' : `Enter your ${role} email`}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = T.primary; e.target.style.boxShadow = `0 0 0 3px ${T.gold10}`; }}
                  onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.textMain, display: 'block', marginBottom: 6 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    style={{ ...inputStyle, paddingRight: 44 }}
                    onFocus={e => { e.target.style.borderColor = T.primary; e.target.style.boxShadow = `0 0 0 3px ${T.gold10}`; }}
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
                style={{ background: T.primary, color: T.primaryDark, border: 'none', borderRadius: 10, padding: '12px 0', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: `0 4px 16px ${T.gold40}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', opacity: loading ? 0.75 : 1, marginTop: 4 }}
                onMouseOver={e => { if (!loading) { e.currentTarget.style.background = T.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                onMouseOut={e => { e.currentTarget.style.background = T.primary; e.currentTarget.style.color = T.primaryDark; e.currentTarget.style.transform = 'none'; }}
              >
                {loading ? <CircularProgress size={20} sx={{ color: T.primaryDark }} /> : `Sign in as ${activeRole.label}`}
              </button>
            </form>

            {role === 'admin' && (
              <p style={{ textAlign: 'center', fontSize: 11, color: T.textLight, marginTop: 14, marginBottom: 0 }}>
                Default: admin@admin.com / admin@123
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
