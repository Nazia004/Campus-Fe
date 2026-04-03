import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { label: 'Dashboard', to: '/student/dashboard', icon: <DashboardIcon fontSize="small" /> },
  { label: 'Clubs', to: '/student/clubs', icon: <GroupsIcon fontSize="small" /> },
  { label: 'Events', to: '/student/events', icon: <EventIcon fontSize="small" /> },
  { label: 'My Activities', to: '/student/my-activities', icon: <StarIcon fontSize="small" /> },
  { divider: true, label: 'Placements' },
  { label: 'Internships', to: '/student/internships', icon: <SchoolIcon fontSize="small" /> },
  { label: 'Jobs', to: '/student/jobs', icon: <WorkIcon fontSize="small" /> },
  { label: 'Campus Drives', to: '/student/campus-drives', icon: <DirectionsCarIcon fontSize="small" /> },
  { label: 'Workshops', to: '/student/workshops', icon: <BuildIcon fontSize="small" /> },
  { label: 'Conferences', to: '/student/conferences', icon: <EmojiEventsIcon fontSize="small" /> },
];

const sidebarStyle = {
  width: 256, minHeight: '100vh',
  background: 'rgba(15,23,42,0.85)',
  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
  borderRight: '1px solid rgba(255,255,255,0.1)',
  display: 'flex', flexDirection: 'column', flexShrink: 0,
};

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'student') return <Navigate to="/login" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#4C1D95 100%)', backgroundAttachment: 'fixed' }}>
      <aside style={sidebarStyle}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
              <SchoolIcon sx={{ fontSize: 20, color: 'white' }} />
            </div>
            <div>
              <p style={{ fontWeight: 700, color: '#F8FAFC', fontSize: 14, margin: 0 }}>CampusHub</p>
              <p style={{ fontSize: 11, color: 'rgba(203,213,225,0.6)', margin: 0 }}>Student Portal</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(203,213,225,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 12px', marginBottom: 8 }}>Menu</p>
          {NAV.map(({ label, to, icon, divider }) =>
            divider ? (
              <p key={label} style={{ fontSize: 11, fontWeight: 600, color: 'rgba(203,213,225,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '12px 12px 4px', margin: 0 }}>{label}</p>
            ) : (
              <NavLink
                key={to}
                to={to}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 12,
                  fontSize: 14, fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  background: isActive ? 'linear-gradient(135deg,#7C3AED,#3B82F6)' : 'transparent',
                  color: isActive ? '#fff' : 'rgba(203,213,225,0.75)',
                  boxShadow: isActive ? '0 4px 20px rgba(124,58,237,0.4)' : 'none',
                })}
              >
                {icon}{label}
              </NavLink>
            )
          )}
        </nav>

        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', marginBottom: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
              <p style={{ fontSize: 11, color: 'rgba(203,213,225,0.5)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
            </div>
          </div>
          <Tooltip title="Logout" placement="right">
            <button
              onClick={() => { logout(); navigate('/login'); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: 'rgba(203,213,225,0.6)', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#FCA5A5'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(203,213,225,0.6)'; }}
            >
              <LogoutIcon fontSize="small" /> Logout
            </button>
          </Tooltip>
        </div>
      </aside>

      <main style={{ flex: 1, padding: 32, overflowY: 'auto', background: 'transparent' }}>
        <Outlet />
      </main>
    </div>
  );
}
