import { useState } from 'react';
import toast from 'react-hot-toast';
import { Outlet, Navigate, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

/**
 * SharedLayout: A generic, optimized shell for all role-based dashboards.
 * Reduces 80% of UI code duplication.
 */
export default function SharedLayout({ 
  navItems = [], 
  portalName = 'Portal', 
  portalIcon: PortalIcon, 
  requiredRole 
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Role Guard
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Shared Sidebar */}
      <aside style={{ 
        width: 256, minHeight: '100vh', background: 'var(--sidebar-bg)', 
        borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', 
        flexShrink: 0, transition: 'background 0.3s, border-color 0.3s' 
      }}>
        {/* Header Section */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ 
              width: 38, height: 38, borderRadius: 12, 
              background: 'white', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              boxShadow: '0 4px 12px rgba(198,90,46,0.2)',
              overflow: 'hidden'
            }}>
              <img src="/cvlogo.png" alt="Logo" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
            </div>
            <div>
              <p style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15, margin: 0, letterSpacing: '-0.02em' }}>CampusHub</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{portalName}</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 12px', marginBottom: 8, opacity: 0.8 }}>Main Menu</p>
          
          {navItems.map((item, idx) => {
            if (item.divider) {
              return <p key={`div-${idx}`} style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '12px 12px 4px', margin: 0, opacity: 0.8 }}>{item.label}</p>;
            }

            if (item.children) {
              return <SidebarDropdown key={item.label} item={item} currentPath={location.pathname} />;
            }

            return <SidebarLink key={item.to} to={item.to} icon={item.icon} label={item.label} />;
          })}
        </nav>

        {/* User & Settings Section */}
        <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', marginBottom: 8 }}>
            <div style={{ 
              width: 32, height: 32, borderRadius: '50%', 
              background: 'var(--primary)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 
            }}>
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
              onClick={() => { 
                logout(); 
                toast.success('Signed out successfully');
                navigate('/', { replace: true }); 
              }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', marginTop: 4 }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(198,90,46,0.1)'; e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <LogoutIcon fontSize="small" /> Logout
            </button>
          </Tooltip>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: 32, overflowY: 'auto', background: 'var(--bg)' }}>
        <Outlet />
      </main>
    </div>
  );
}

/**
 * Sub-component for simple sidebar links
 */
function SidebarLink({ to, icon, label, indent = false }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px', borderRadius: 12,
        marginLeft: indent ? 16 : 0,
        fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s',
        background: isActive ? 'var(--primary)' : 'transparent',
        color: isActive ? '#fff' : 'var(--text-secondary)',
        boxShadow: isActive ? 'var(--nav-active-shadow)' : 'none',
        transform: isActive ? 'scale(1.02)' : 'none',
      })}
    >
      {icon}{label}
    </NavLink>
  );
}

/**
 * Sub-component for dropdown menus
 */
function SidebarDropdown({ item, currentPath }) {
  const isChildActive = item.children.some(child => currentPath.startsWith(child.to));
  const [open, setOpen] = useState(isChildActive);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px', borderRadius: 12,
          fontSize: 14, fontWeight: 600, textDecoration: 'none',
          background: 'transparent', color: 'var(--text-secondary)',
          border: 'none', cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseOver={e => { e.currentTarget.style.background = 'var(--nav-hover-bg)'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        {item.icon}
        <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
        <ExpandMoreIcon
          fontSize="small"
          style={{ transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? '400px' : '0px', transition: 'max-height 0.3s ease' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
          {item.children.map(child => (
            <SidebarLink key={child.to} to={child.to} icon={child.icon} label={child.label} indent />
          ))}
        </div>
      </div>
    </div>
  );
}
