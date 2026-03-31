import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { label: 'Dashboard', to: '/club/dashboard', icon: <DashboardIcon fontSize="small" /> },
  { label: 'Events', to: '/club/events', icon: <EventIcon fontSize="small" /> },
  { label: 'Clubs', to: '/club/clubs', icon: <GroupsIcon fontSize="small" /> },
];

export default function ClubLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'club') return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 min-h-screen text-white flex flex-col shadow-2xl" style={{ background: 'var(--brown)' }}>
        <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(201,162,39,0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'var(--gold)' }}>
              <GroupsIcon sx={{ fontSize: 20, color: 'var(--brown)' }} />
            </div>
            <div>
              <p className="font-bold text-white text-sm">CampusHub</p>
              <p className="text-xs" style={{ color: 'var(--gold)' }}>Club Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider px-3 mb-3" style={{ color: 'var(--gold)' }}>Menu</p>
          {NAV.map(({ label, to, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive ? 'text-white shadow-lg' : 'hover:text-white'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--gold)' : 'transparent',
                color: isActive ? 'var(--brown)' : 'rgba(250,243,224,0.7)',
              })}
            >
              {icon}{label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(201,162,39,0.3)' }}>
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--gold)', color: 'var(--brown)' }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--gold)' }}>{user?.email}</p>
            </div>
          </div>
          <Tooltip title="Logout" placement="right">
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-red-500/10 hover:text-red-400"
              style={{ color: 'rgba(250,243,224,0.6)' }}
            >
              <LogoutIcon fontSize="small" /> Logout
            </button>
          </Tooltip>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto" style={{ background: 'var(--primary-bg)' }}>
        <Outlet />
      </main>
    </div>
  );
}
