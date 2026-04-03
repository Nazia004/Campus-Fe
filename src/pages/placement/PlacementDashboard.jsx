import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

const TYPES = [
  { key: 'internship', label: 'Internships', icon: <SchoolIcon />, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100', to: '/placement/internships' },
  { key: 'job', label: 'Jobs', icon: <WorkIcon />, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100', to: '/placement/jobs' },
  { key: 'campus_drive', label: 'Campus Drives', icon: <DirectionsCarIcon />, color: 'bg-purple-50 text-purple-600', border: 'border-purple-100', to: '/placement/campus-drives' },
  { key: 'workshop', label: 'Workshops', icon: <BuildIcon />, color: 'bg-orange-50 text-orange-600', border: 'border-orange-100', to: '/placement/workshops' },
  { key: 'conference', label: 'Conferences', icon: <EmojiEventsIcon />, color: 'bg-pink-50 text-pink-600', border: 'border-pink-100', to: '/placement/conferences' },
];

export default function PlacementDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/placement/manage').then(({ data }) => {
      const c = {};
      TYPES.forEach((t) => { c[t.key] = data.data.filter((d) => d.type === t.key).length; });
      setCounts(c);
      setRecent(data.data.slice(0, 5));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div>
      <div className="mb-8">
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>{greeting},</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{user?.name} 👋</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>Manage all placement activities from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {TYPES.map((t) => (
          <button key={t.key} onClick={() => navigate(t.to)}
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'var(--shadow)' }}
            onMouseOver={e => { e.currentTarget.style.background = 'var(--card-bg-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'var(--card-bg)'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(201,162,39,0.15)', color: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>{t.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#C9A227', lineHeight: 1.1 }}>
              {loading ? <CircularProgress size={18} sx={{ color: '#C9A227' }} /> : (counts[t.key] || 0)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, marginTop: 4 }}>{t.label}</div>
          </button>
        ))}
      </div>

      {/* Recent listings */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)' }}>
        <h2 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20, fontSize: 15 }}>Recent Listings</h2>
        {loading ? <div className="flex justify-center py-8"><CircularProgress sx={{ color: '#C9A227' }} /></div>
          : recent.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, textAlign: 'center', padding: '32px 0' }}>No listings yet. Start by creating one from the sidebar.</p>
          ) : (
            <div className="space-y-3">
              {recent.map((r) => {
                const t = TYPES.find((x) => x.key === r.type);
                return (
                  <div key={r._id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 12, background: 'var(--bg-secondary)', borderRadius: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(201,162,39,0.15)', color: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{t?.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>{r.company || t?.label} · {r.location || 'Location TBD'}</p>
                    </div>
                    <button onClick={() => navigate(t?.to)} style={{ fontSize: 12, color: '#C9A227', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                      View <ArrowForwardIcon sx={{ fontSize: 13 }} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}
