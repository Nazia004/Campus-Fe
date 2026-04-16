import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const SharedLayout = lazy(() => import('../components/SharedLayout'));

const NAV_ITEMS = [
  { label: 'Dashboard',         to: '/admin/dashboard',   icon: <DashboardIcon fontSize="small" /> },
  { label: 'Manage Students',   to: '/admin/students',    icon: <SchoolIcon fontSize="small" /> },
  { label: 'Manage Clubs',      to: '/admin/clubs',       icon: <GroupsIcon fontSize="small" /> },
  { label: 'Manage Placements', to: '/admin/placements',  icon: <WorkIcon fontSize="small" /> },
];

export default function AdminLayout() {
  return (
    <SharedLayout 
      navItems={NAV_ITEMS}
      portalName="Admin Panel"
      portalIcon={AdminPanelSettingsIcon}
      requiredRole="admin"
    />
  );
}
