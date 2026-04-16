import { lazy } from 'react';
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

const SharedLayout = lazy(() => import('../components/SharedLayout'));

const NAV_ITEMS = [
  { label: 'Dashboard',     to: '/student/dashboard',     icon: <DashboardIcon fontSize="small" /> },
  { label: 'Fee Structure', to: '/student/fee-structure', icon: <AccountBalanceIcon fontSize="small" /> },
  { 
    label: 'Clubs',
    icon: <GroupsIcon fontSize="small" />,
    children: [
      { label: 'Events',        to: '/student/events',        icon: <EventIcon fontSize="small" /> },
      { label: 'My Activities', to: '/student/my-activities', icon: <StarIcon fontSize="small" /> },
    ]
  },
  { divider: true, label: 'Placements' },
  { 
    label: 'Placement',
    icon: <WorkIcon fontSize="small" />,
    children: [
      { label: 'Internships',   to: '/student/internships',   icon: <SchoolIcon fontSize="small" /> },
      { label: 'Campus Drives', to: '/student/campus-drives', icon: <DirectionsCarIcon fontSize="small" /> },
      { label: 'Workshops',     to: '/student/workshops',     icon: <BuildIcon fontSize="small" /> },
      { label: 'Conferences',   to: '/student/conferences',   icon: <EmojiEventsIcon fontSize="small" /> },
    ]
  }
];

export default function StudentLayout() {
  return (
    <SharedLayout 
      navItems={NAV_ITEMS}
      portalName="Student Portal"
      portalIcon={SchoolIcon}
      requiredRole="student"
    />
  );
}
