import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

const QUICK_LINKS = [
  { label: 'Manage Students', to: '/admin/students', icon: <SchoolIcon />, color: 'bg-blue-600', desc: 'Add, edit or remove students' },
  { label: 'Manage Clubs', to: '/admin/clubs', icon: <GroupsIcon />, color: 'bg-purple-600', desc: 'Oversee club activities' },
  { label: 'Manage Placements', to: '/admin/placements', icon: <WorkIcon />, color: 'bg-emerald-600', desc: 'Track placement listings' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ students: null, clubs: null, faculty: null, placements: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(({ data }) => setStats(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const STAT_CARDS = [
    { label: 'Total Students', value: stats.students, icon: <SchoolIcon /> },
    { label: 'Active Clubs', value: stats.clubs, icon: <GroupsIcon /> },
    { label: 'Faculty Members', value: stats.faculty, icon: <SupervisorAccountIcon /> },
    { label: 'Placement Listings', value: stats.placements, icon: <WorkIcon /> },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>{greeting},</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{user?.name} 👋</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>Here's what's happening on your campus today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {STAT_CARDS.map((card) => (
          <div key={card.label} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(198,90,46,0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              {card.icon}
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)', marginBottom: 4, lineHeight: 1 }}>
              {card.value === null ? <CircularProgress size={20} sx={{ color: 'var(--accent)' }} /> : card.value}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mb-4">
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUpIcon sx={{ fontSize: 20, color: 'var(--primary)' }} /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_LINKS.map((link) => (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--card-bg-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'var(--card-bg)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(198,90,46,0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                {link.icon}
              </div>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14, margin: '0 0 4px' }}>{link.label}</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>{link.desc}</p>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>
                Go <ArrowForwardIcon sx={{ fontSize: 14 }} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
