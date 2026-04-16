import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const SharedLayout = lazy(() => import('../components/SharedLayout'));

const NAV_ITEMS = [
  { label: 'Dashboard',     to: '/placement/dashboard',     icon: <DashboardIcon fontSize="small" /> },
  { label: 'Internships',   to: '/placement/internships',   icon: <SchoolIcon fontSize="small" /> },
  { label: 'Jobs',          to: '/placement/jobs',          icon: <WorkIcon fontSize="small" /> },
  { label: 'Campus Drives', to: '/placement/campus-drives', icon: <DirectionsCarIcon fontSize="small" /> },
  { label: 'Workshops',     to: '/placement/workshops',     icon: <BuildIcon fontSize="small" /> },
  { label: 'Conferences',   to: '/placement/conferences',   icon: <EmojiEventsIcon fontSize="small" /> },
];

export default function PlacementLayout() {
  return (
    <SharedLayout 
      navItems={NAV_ITEMS}
      portalName="Placement Cell"
      portalIcon={WorkIcon}
      requiredRole="placement"
    />
  );
}
