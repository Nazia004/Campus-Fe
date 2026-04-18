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
// ── Theme tokens ──────────────────────────────────────────────────────────────
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
  accent20:    'rgba(155,17,30,0.20)',
  accent40:    'rgba(155,17,30,0.40)',
};

const ROLES = [
  { key: 'student',   label: 'Student',   icon: <SchoolIcon />,             color: 'var(--color-primary)' },
  { key: 'club',      label: 'Club',       icon: <GroupsIcon />,             color: 'var(--color-primary)' },
  { key: 'placement', label: 'Placement',  icon: <WorkIcon />,               color: 'var(--color-primary)' },
  { key: 'admin',     label: 'Admin',      icon: <AdminPanelSettingsIcon />, color: 'var(--color-primary)' },
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
      // 1. Submit only email and password (autodetect role on server)
      const { data } = await api.post('/auth/login', { email, password });
      
      const userRole = data.role || data.user.role;
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}!`);

      // 2. Navigate based on the role returned by the server
      if (userRole === 'admin') navigate('/admin/dashboard', { replace: true });
      else if (userRole === 'club') navigate('/club/dashboard', { replace: true });
      else if (userRole === 'student') navigate('/student/dashboard', { replace: true });
      else if (userRole === 'placement') navigate('/placement/dashboard', { replace: true });
      else navigate('/dashboard', { replace: true });
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
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .login-card { animation: loginFadeIn 0.5s cubic-bezier(0.22,1,0.36,1) both; overflow: hidden; }
        .info-pane { transition: all 0.4s ease; cursor: pointer; position: relative; overflow: hidden; }
        .info-pane:hover { transform: scale(1.02); filter: brightness(1.1); }
        .info-pane::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%); transition: all 0.6s; transform: rotate(25deg); }
        .info-pane:hover::after { left: 100%; }
        input::placeholder { color: #AAAAAA !important; }
        @media (max-width: 860px) {
          .portal-grid { grid-template-columns: 1fr !important; }
          .info-pane { display: none !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, background: `linear-gradient(135deg, ${T.bg} 0%, ${T.bgAlt} 100%)`,
        position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif',
      }}>
        {/* Soft background glows */}
        <div style={{ position: 'absolute', top: -60, left: -60, width: 400, height: 400, background: `radial-gradient(circle, ${T.accent20} 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, right: -100, width: 500, height: 500, background: `radial-gradient(circle, ${T.accent10} 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div className="portal-grid login-card" style={{
          width: '100%', maxWidth: 940, background: T.bgCard, border: `1px solid ${T.border}`,
          borderRadius: 24, boxShadow: '0 20px 60px rgba(62,39,35,0.12)',
          display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: 600,
        }}>
          
          {/* ━━ LEFT PANE (INFO/BRAND) ━━━━━━━━━━━━━━━━━━ */}
          <div 
            className="info-pane"
            onClick={() => window.location.href = 'https://cgu-odisha.ac.in/'}
            style={{ 
              background: `linear-gradient(160deg, ${T.primary} 0%, ${T.primaryDark} 100%)`,
              padding: 48, display: 'flex', flexDirection: 'column', color: '#FFF',
              justifyContent: 'space-between', position: 'relative'
            }}
          >
            {/* Top Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: '#FFF', padding: 6, borderRadius: 10, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/cvlogo.png" alt="Logo" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em' }}>CampusHub</span>
            </div>

            {/* Main Message */}
            <div>
              <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', display: 'inline-block', padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
                #1 Campus Management Platform
              </div>
              <h2 style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.1, margin: 0, letterSpacing: '-1px' }}>
                RANKED AMONGST THE <br />
                <span style={{ color: T.accent }}>TOP UNIVERSITIES</span> GLOBALLY
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 24, lineHeight: 1.6, maxWidth: 380 }}>
                A unified ecosystem for students, faculty, and administrators to thrive together in excellence.
              </p>
            </div>

            {/* Bottom Proof */}
            <div style={{ display: 'flex', gap: 24, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 28 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900 }}>50K+</div>
                <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 600 }}>Active Users</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900 }}>100+</div>
                <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 600 }}>Partners</div>
              </div>
            </div>
          </div>

          {/* ━━ RIGHT PANE (LOGIN FORM) ━━━━━━━━━━━━━━━━━ */}
          <div style={{ padding: '56px 48px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: T.primary, fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
                LOGIN <span style={{ color: T.textLight, fontWeight: 400, margin: '0 4px' }}>|</span> <span style={{ color: T.textLight, fontSize: 16 }}>{activeRole.label.toUpperCase()}</span>
              </div>
              <p style={{ color: T.textLight, fontSize: 13, margin: 0 }}>Please enter your credentials to continue</p>
              {role !== 'admin' && (
                <button onClick={() => setRole('admin')} style={{ background: 'none', border: 'none', color: T.primary, fontSize: 13, fontWeight: 700, padding: 0, marginTop: 8, cursor: 'pointer', textDecoration: 'underline' }}>
                  Click here for admin login
                </button>
              )}
            </div>

            {/* Role Header (Mini) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, padding: 6, background: T.bgAlt, borderRadius: 14, marginBottom: 26, border: `1px solid ${T.border}` }}>
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '10px 4px', borderRadius: 10, fontSize: 10, fontWeight: 700,
                    border: role === r.key ? `1px solid ${T.accent40}` : '1px solid transparent',
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: role === r.key ? T.bgCard : 'transparent',
                    color: role === r.key ? T.primary : T.textLight,
                    boxShadow: role === r.key ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  {r.icon}
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: T.textMain, display: 'block', marginBottom: 6 }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={`e.g. ${role}@campuszone.co.in`}
                    style={{ ...inputStyle, paddingLeft: 40 }}
                    onFocus={e => { e.target.style.borderColor = T.primary; e.target.style.boxShadow = `0 0 0 4px ${T.accent10}`; }}
                    onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none'; }}
                  />
                  <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.border, display: 'flex' }}>
                    {activeRole.icon}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: T.textMain, display: 'block', marginBottom: 6 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                    style={{ ...inputStyle, paddingLeft: 40, paddingRight: 44 }}
                    onFocus={e => { e.target.style.borderColor = T.primary; e.target.style.boxShadow = `0 0 0 4px ${T.accent10}`; }}
                    onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none'; }}
                  />
                  <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.border, display: 'flex' }}>
                    <Visibility fontSize="small" style={{ opacity: 0.5 }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.textLight, display: 'flex', alignItems: 'center' }}
                  >
                    {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </button>
                </div>
                <p style={{ fontSize: 11, color: T.textLight, marginTop: 6, fontWeight: 500 }}>
                  Hint: Use <span style={{ fontWeight: 700, color: T.primary }}>{activeRole.label}@2025</span>
                </p>
              </div>

              <div style={{ textAlign: 'right', marginTop: -12 }}>
                <a href="#" style={{ fontSize: 12, color: T.textLight, textDecoration: 'none' }}>Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ background: T.primary, color: '#fff', border: 'none', borderRadius: 12, padding: '14px 0', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: `0 6px 20px ${T.accent40}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', opacity: loading ? 0.75 : 1, marginTop: 8 }}
                onMouseOver={e => { if (!loading) { e.currentTarget.style.background = T.accent; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                onMouseOut={e => { e.currentTarget.style.background = T.primary; e.currentTarget.style.transform = 'none'; }}
              >
                {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'LOGIN'}
              </button>
            </form>

            <div style={{ marginTop: 'auto', paddingTop: 32, textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: T.textLight, marginBottom: 12 }}>Trouble connecting?</p>
              <button
                onClick={() => {
                  const mockUser = { name: 'Preview User', email: 'dev@preview.com', role: role };
                  login(mockUser, 'mock-token');
                  toast.success(`Entering ${role} Portal (Preview Mode)`);
                  navigate(`/${role}/dashboard`, { replace: true });
                }}
                style={{
                  background: 'none', border: `1px solid ${T.primary}`, color: T.primary,
                  padding: '8px 24px', borderRadius: 10, fontSize: 12, fontWeight: 800,
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseOver={e => { e.currentTarget.style.background = T.accent10; }}
                onMouseOut={e => { e.currentTarget.style.background = 'none'; }}
              >
                Launch Developer Preview 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
