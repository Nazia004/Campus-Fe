import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout, getUserField, isRole } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  const roleBadge = isRole('admin')
    ? { bg: 'rgba(239,68,68,0.2)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)' }
    : isRole('placement')
    ? { bg: 'rgba(16,185,129,0.2)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.3)' }
    : isRole('club_leader')
    ? { bg: 'rgba(245,158,11,0.2)', color: '#FDE68A', border: '1px solid rgba(245,158,11,0.3)' }
    : { bg: 'rgba(124,58,237,0.2)', color: '#C4B5FD', border: '1px solid rgba(124,58,237,0.3)' };

  return (
    <>
      <nav style={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span style={{ fontSize: 22 }}>🎓</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em' }}>CampusHub</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC', margin: 0 }}>{getUserField('name', 'Guest')}</p>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, textTransform: 'capitalize', ...roleBadge }}>
              {getUserField('role', 'student')}
            </span>
          </div>

          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
            {getUserField('name', 'G').charAt(0).toUpperCase()}
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(124,58,237,0.35)', transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.filter = 'brightness(1.15)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
          >
            Logout
          </button>
        </div>
      </nav>

      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>👋</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F8FAFC', margin: '0 0 6px' }}>Logging out?</h3>
              <p style={{ fontSize: 13, color: 'rgba(203,213,225,0.7)', margin: 0 }}>You'll need to sign in again to access your dashboard.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#CBD5E1', fontWeight: 600, padding: '10px 0', borderRadius: 12, cursor: 'pointer', fontSize: 14, transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                style={{ flex: 1, background: 'linear-gradient(135deg,#EF4444,#DC2626)', color: '#fff', border: 'none', fontWeight: 700, padding: '10px 0', borderRadius: 12, cursor: 'pointer', fontSize: 14, boxShadow: '0 4px 16px rgba(239,68,68,0.35)', transition: 'all 0.2s' }}
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
