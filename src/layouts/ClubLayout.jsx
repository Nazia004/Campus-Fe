import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';

const SharedLayout = lazy(() => import('../components/SharedLayout'));

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/club/dashboard', icon: <DashboardIcon fontSize="small" /> },
  { label: 'Events',    to: '/club/events',    icon: <EventIcon fontSize="small" /> },
  { label: 'Clubs',     to: '/club/clubs',     icon: <GroupsIcon fontSize="small" /> },
];

export default function ClubLayout() {
  return (
    <SharedLayout 
      navItems={NAV_ITEMS}
      portalName="Club Portal"
      portalIcon={GroupsIcon}
      requiredRole="club"
    />
  );
}
