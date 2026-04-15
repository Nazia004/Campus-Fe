import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

const NAV = [
  { label: 'Dashboard',     to: '/placement/dashboard',     icon: <DashboardIcon fontSize="small" /> },
  { label: 'Internships',   to: '/placement/internships',   icon: <SchoolIcon fontSize="small" /> },
  { label: 'Jobs',          to: '/placement/jobs',          icon: <WorkIcon fontSize="small" /> },
  { label: 'Campus Drives', to: '/placement/campus-drives', icon: <DirectionsCarIcon fontSize="small" /> },
  { label: 'Workshops',     to: '/placement/workshops',     icon: <BuildIcon fontSize="small" /> },
  { label: 'Conferences',   to: '/placement/conferences',   icon: <EmojiEventsIcon fontSize="small" /> },
];

export default function PlacementLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user || user.role !== 'placement') return <Navigate to="/" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 256, minHeight: '100vh', background: 'var(--sidebar-bg)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0, transition: 'background 0.3s, border-color 0.3s' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg,var(--primary),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(201,162,39,0.3)' }}>
              <WorkIcon sx={{ fontSize: 20, color: 'white' }} />
            </div>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14, margin: 0 }}>CampusHub</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>Placement Cell</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 12px', marginBottom: 8 }}>Menu</p>
          {NAV.map(({ label, to, icon }) => (
            <NavLink key={to} to={to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 12,
                fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s',
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? '#1C1917' : 'var(--text-secondary)',
                boxShadow: isActive ? 'var(--nav-active-shadow)' : 'none',
              })}
            >
              {icon}{label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#1C1917', flexShrink: 0 }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
            </div>
          </div>
          <ThemeToggle />
          <Tooltip title="Logout" placement="right">
            <button
              onClick={() => { logout(); navigate('/'); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#FCA5A5'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <LogoutIcon fontSize="small" /> Logout
            </button>
          </Tooltip>
        </div>
      </aside>

      <main style={{ flex: 1, padding: 32, overflowY: 'auto', background: 'var(--bg)' }}>
        <Outlet />
      </main>
    </div>
  );
}
