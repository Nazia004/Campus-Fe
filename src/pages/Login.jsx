import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CircularProgress, InputAdornment, IconButton } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const ROLES = [
  { key: 'student',   label: 'Student',   icon: <SchoolIcon />,              accent: 'rgba(59,130,246,0.25)',  border: 'rgba(59,130,246,0.5)',  color: '#93C5FD'  },
  { key: 'club',      label: 'Club',       icon: <GroupsIcon />,              accent: 'rgba(124,58,237,0.25)', border: 'rgba(124,58,237,0.5)', color: '#C4B5FD' },
  { key: 'placement', label: 'Placement',  icon: <WorkIcon />,                accent: 'rgba(16,185,129,0.25)', border: 'rgba(16,185,129,0.5)', color: '#6EE7B7' },
  { key: 'admin',     label: 'Admin',      icon: <AdminPanelSettingsIcon />,  accent: 'rgba(249,115,22,0.25)', border: 'rgba(249,115,22,0.5)', color: '#FCA5A5' },
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
    width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 14,
    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
    color: '#F8FAFC', outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#4C1D95 100%)', backgroundAttachment: 'fixed' }}>

      {/* Left panel */}
      <div style={{ display: 'none', flex: 1, padding: 48, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.1)', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}
        className="lg-flex">
        <div style={{ position: 'absolute', top: 80, left: 40, width: 300, height: 300, background: 'rgba(124,58,237,0.15)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 80, right: 40, width: 250, height: 250, background: 'rgba(59,130,246,0.1)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(203,213,225,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, position: 'relative', zIndex: 1, transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.color = 'rgba(203,213,225,0.6)'}>
          <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to home
        </button>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SchoolIcon sx={{ color: 'white', fontSize: 26 }} />
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC' }}>CampusHub</span>
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#F8FAFC', lineHeight: 1.2, marginBottom: 16 }}>Your campus,<br />all in one place.</h2>
          <p style={{ color: 'rgba(203,213,225,0.7)', fontSize: 16, lineHeight: 1.7 }}>
            Sign in to access your personalized dashboard — academics, clubs, placements and more.
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ROLES.map((r) => (
              <div key={r.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, background: role === r.key ? 'rgba(255,255,255,0.1)' : 'transparent', border: role === r.key ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent', transition: 'all 0.2s' }}>
                <span style={{ color: role === r.key ? r.color : 'rgba(203,213,225,0.5)' }}>{r.icon}</span>
                <span style={{ color: role === r.key ? '#F8FAFC' : 'rgba(203,213,225,0.5)', fontWeight: 500 }}>{r.label} Portal</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ color: 'rgba(203,213,225,0.4)', fontSize: 12, position: 'relative', zIndex: 1 }}>© 2025 CampusHub. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(203,213,225,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, marginBottom: 24, transition: 'color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.color = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.color = 'rgba(203,213,225,0.6)'}>
            <ArrowBackIcon sx={{ fontSize: 16 }} /> Back
          </button>

          <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', margin: '0 0 6px' }}>Sign in</h1>
              <p style={{ color: 'rgba(203,213,225,0.6)', fontSize: 13, margin: 0 }}>Select your role and enter your credentials</p>
            </div>

            {/* Role selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, padding: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 14, marginBottom: 24 }}>
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 4px', borderRadius: 10, fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                    background: role === r.key ? 'rgba(255,255,255,0.12)' : 'transparent',
                    color: role === r.key ? r.color : 'rgba(203,213,225,0.5)',
                    transform: role === r.key ? 'scale(1.05)' : 'none',
                    boxShadow: role === r.key ? '0 2px 12px rgba(0,0,0,0.2)' : 'none',
                  }}
                >
                  {r.icon}
                  {r.label}
                </button>
              ))}
            </div>

            {/* Active role badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, marginBottom: 24, background: activeRole.accent, border: `1px solid ${activeRole.border}`, color: activeRole.color, fontSize: 13, fontWeight: 500 }}>
              {activeRole.icon}
              Signing in as <strong>{activeRole.label}</strong>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(203,213,225,0.7)', display: 'block', marginBottom: 6 }}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={role === 'admin' ? 'admin@admin.com' : `Enter your ${role} email`}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = activeRole.border; e.target.style.boxShadow = `0 0 0 3px ${activeRole.accent}`; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(203,213,225,0.7)', display: 'block', marginBottom: 6 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    style={{ ...inputStyle, paddingRight: 44 }}
                    onFocus={e => { e.target.style.borderColor = activeRole.border; e.target.style.boxShadow = `0 0 0 3px ${activeRole.accent}`; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(203,213,225,0.5)', display: 'flex', alignItems: 'center' }}>
                    {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px 0', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', opacity: loading ? 0.8 : 1, marginTop: 4 }}
                onMouseOver={e => { if (!loading) { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                onMouseOut={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : `Sign in as ${activeRole.label}`}
              </button>
            </form>

            {role === 'admin' && (
              <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(203,213,225,0.4)', marginTop: 16, marginBottom: 0 }}>
                Default: admin@admin.com / admin@123
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
