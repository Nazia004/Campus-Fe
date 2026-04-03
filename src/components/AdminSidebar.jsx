import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: <DashboardIcon fontSize="small" /> },
  { label: 'Manage Students', to: '/admin/students', icon: <SchoolIcon fontSize="small" /> },
  { label: 'Manage Clubs', to: '/admin/clubs', icon: <GroupsIcon fontSize="small" /> },
  { label: 'Manage Placements', to: '/admin/placements', icon: <WorkIcon fontSize="small" /> },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside style={{ width: '256px', minHeight: '100vh', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 20, color: 'white' }} />
          </div>
          <div>
            <p style={{ fontWeight: 700, color: '#F8FAFC', fontSize: 14, margin: 0 }}>CampusHub</p>
            <p style={{ fontSize: 11, color: 'rgba(203,213,225,0.6)', margin: 0 }}>Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(203,213,225,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 12px', marginBottom: 8 }}>Menu</p>
        {NAV.map(({ label, to, icon }) => (
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
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Admin'}</p>
            <p style={{ fontSize: 11, color: 'rgba(203,213,225,0.5)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
          </div>
        </div>
        <Tooltip title="Logout" placement="right">
          <button
            onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: 'rgba(203,213,225,0.6)', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#FCA5A5'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(203,213,225,0.6)'; }}
          >
            <LogoutIcon fontSize="small" />
            Logout
          </button>
        </Tooltip>
      </div>
    </aside>
  );
}
