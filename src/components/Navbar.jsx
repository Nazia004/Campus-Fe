import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import useDarkMode from '../hooks/useDarkMode';

export default function Navbar() {
  const { logout, getUserField, isRole } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [dark, toggleDark] = useDarkMode();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  const roleBadge = isRole('admin')
    ? { background: 'rgba(225,29,72,0.2)', color: 'var(--accent)', border: '1px solid rgba(225,29,72,0.35)' }
    : isRole('placement')
    ? { background: 'rgba(16,185,129,0.2)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.3)' }
    : isRole('club_leader')
    ? { background: 'rgba(245,158,11,0.2)', color: '#FDE68A', border: '1px solid rgba(245,158,11,0.3)' }
    : { background: 'rgba(159,18,57,0.2)', color: 'var(--text-secondary)', border: '1px solid var(--border)' };

  return (
    <>
      <nav style={{
        background: 'var(--sidebar-bg)',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        padding: '12px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span style={{ fontSize: 22 }}>🎓</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>CampusHub</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{getUserField('name', 'Guest')}</p>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, textTransform: 'capitalize', ...roleBadge }}>
              {getUserField('role', 'student')}
            </span>
          </div>

          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary),var(--accent))', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
            {getUserField('name', 'G').charAt(0).toUpperCase()}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleDark}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, cursor: 'pointer', flexShrink: 0 }}
            onMouseOver={e => e.currentTarget.style.background = 'var(--nav-hover-bg)'}
            onMouseOut={e => e.currentTarget.style.background = 'var(--card-bg)'}
          >
            {dark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            style={{ background: 'linear-gradient(135deg,var(--primary),var(--accent))', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(159,18,57,0.35)' }}
            onMouseOver={e => { e.currentTarget.style.filter = 'brightness(1.15)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
          >
            Logout
          </button>
        </div>
      </nav>

      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--overlay-bg)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'var(--modal-bg)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 360, boxShadow: 'var(--shadow-hover)' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>👋</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px' }}>Logging out?</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>You'll need to sign in again to access your dashboard.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1, background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontWeight: 600, padding: '10px 0', borderRadius: 12, cursor: 'pointer', fontSize: 14 }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--card-bg-hover)'}
                onMouseOut={e => e.currentTarget.style.background = 'var(--card-bg)'}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                style={{ flex: 1, background: 'linear-gradient(135deg,#EF4444,#DC2626)', color: '#fff', border: 'none', fontWeight: 700, padding: '10px 0', borderRadius: 12, cursor: 'pointer', fontSize: 14, boxShadow: '0 4px 16px rgba(239,68,68,0.35)' }}
                onMouseOver={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseOut={e => e.currentTarget.style.filter = 'none'}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
