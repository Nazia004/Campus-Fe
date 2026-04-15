import { useState } from 'react';
import { Outlet, Navigate, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

function SidebarDropdown({ label, icon, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px', borderRadius: 12,
          fontSize: 14, fontWeight: 500, textDecoration: 'none',
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: 'none', cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseOver={e => { e.currentTarget.style.background = 'var(--hover-bg, rgba(201,162,39,0.08))'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        {icon}
        <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
        <ExpandMoreIcon
          fontSize="small"
          style={{
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '300px' : '0px',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
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
  );
}

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (!user || user.role !== 'student') return <Navigate to="/login" replace />;

  const isClubsActive = ['/student/clubs', '/student/events', '/student/my-activities'].some(p => location.pathname.startsWith(p));
  const isPlacementActive = ['/student/internships', '/student/campus-drives', '/student/workshops', '/student/conferences'].some(p => location.pathname.startsWith(p));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 256, minHeight: '100vh', background: 'var(--sidebar-bg)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0, transition: 'background 0.3s, border-color 0.3s' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg,var(--primary),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(201,162,39,0.3)' }}>
              <SchoolIcon sx={{ fontSize: 20, color: 'white' }} />
            </div>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14, margin: 0 }}>CampusHub</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>Student Portal</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          {/* Dashboard */}
          <SidebarLink to="/student/dashboard" icon={<DashboardIcon fontSize="small" />} label="Dashboard" />

          {/* Fee Structure */}
          <SidebarLink to="/student/fee-structure" icon={<AccountBalanceIcon fontSize="small" />} label="Fee Structure" />

          {/* Clubs Dropdown */}
          <SidebarDropdown
            label="Clubs"
            icon={<GroupsIcon fontSize="small" />}
            defaultOpen={isClubsActive}
          >
            <SidebarLink to="/student/clubs" icon={<GroupsIcon fontSize="small" />} label="All Clubs" />
            <SidebarLink to="/student/events" icon={<EventIcon fontSize="small" />} label="Events" />
            <SidebarLink to="/student/my-activities" icon={<StarIcon fontSize="small" />} label="My Activities" />
          </SidebarDropdown>

          {/* Placement Dropdown */}
          <SidebarDropdown
            label="Placement"
            icon={<WorkIcon fontSize="small" />}
            defaultOpen={isPlacementActive}
          >
            <SidebarLink to="/student/internships" icon={<SchoolIcon fontSize="small" />} label="Internships" />
            <SidebarLink to="/student/campus-drives" icon={<DirectionsCarIcon fontSize="small" />} label="Campus Drives" />
            <SidebarLink to="/student/workshops" icon={<BuildIcon fontSize="small" />} label="Workshops" />
            <SidebarLink to="/student/conferences" icon={<EmojiEventsIcon fontSize="small" />} label="Conferences" />
          </SidebarDropdown>
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
