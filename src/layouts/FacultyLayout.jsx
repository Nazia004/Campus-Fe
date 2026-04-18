import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import EventNoteIcon from '@mui/icons-material/EventNote';

const SharedLayout = lazy(() => import('../components/SharedLayout'));

const NAV_ITEMS = [
  { label: 'Dashboard',   to: '/faculty/dashboard', icon: <DashboardIcon fontSize="small" /> },
  { label: 'My Students', to: '/faculty/students',  icon: <SchoolIcon fontSize="small" /> },
  { label: 'Schedule',    to: '/faculty/schedule',  icon: <EventNoteIcon fontSize="small" /> },
];

export default function FacultyLayout() {
  return (
    <SharedLayout 
      navItems={NAV_ITEMS}
      portalName="Faculty Portal"
      portalIcon={SupervisorAccountIcon}
      requiredRole="faculty"
    />
  );
}
