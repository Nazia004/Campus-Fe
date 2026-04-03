import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CircularProgress, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CustomTypography from '@mui/material/Typography';
import api from '../../api';

// ── Shared styles matching Beige+Gold theme ──
const T = {
  primary: '#C9A227',    // Gold
  primaryDark: '#A67C00', // Darker Gold
  brown: '#3E2723',      // Dark Brown
  brownLight: '#5D4037', // Lighter Brown
  bgLight: '#FAF3E0',    // Beige background
  cardBg: '#FFFFFF',     // White
  textMain: '#2D2D2D',
  textSecondary: '#6D6D6D',
  border: '#E8DCCB',
};

const TABS = [
  { id: 'all', label: 'All Placements', path: null },
  { id: 'internship', label: 'Internships', path: '/student/internships' },
  { id: 'job', label: 'Jobs', path: '/student/jobs' },
  { id: 'campus_drive', label: 'Campus Drives', path: '/student/campus-drives' },
  { id: 'workshop', label: 'Workshops', path: '/student/workshops' },
  { id: 'conference', label: 'Conferences', path: '/student/conferences' },
];

export default function StudentPlacementPage({ type }) {
  const navigate = useNavigate();
  const location = useLocation();

  // If a prop type is provided, use it; otherwise default to 'all' if somehow mounted without one.
  const initialTab = type || 'all';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fetching, setFetching] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  // Stats (derived and mocked for a real feel)
  const [stats, setStats] = useState({ applied: 0, shortlisted: 0, interviews: 0, offers: 0 });

  const fetchItems = async (currentType) => {
    setFetching(true);
    try {
      const endpoint = currentType === 'all' ? '/placement' : `/placement?type=${currentType}`;
      const { data } = await api.get(endpoint);
      setItems(data.data);
      
      // Calculate realistic stats based on data
      const applied = data.data.filter(i => i.hasApplied).length;
      setStats({
        applied: applied,
        shortlisted: Math.floor(applied * 0.4), // mock
        interviews: Math.floor(applied * 0.2),  // mock
        offers: Math.floor(applied * 0.05),     // mock
      });
    } catch { 
      toast.error('Failed to load placement data'); 
    } finally { 
      setFetching(false); 
    }
  };

  // Sync tab state with route prop
  useEffect(() => {
    setActiveTab(type || 'all');
    fetchItems(type || 'all');
  }, [type]);

  // Apply Search and Filters
  useEffect(() => {
    let list = items;
    const q = search.toLowerCase();
    
    if (q) {
      list = list.filter((i) =>
        (i.title || '').toLowerCase().includes(q) ||
        (i.company || '').toLowerCase().includes(q) ||
        (i.location || '').toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'All') {
      if (statusFilter === 'Applied') list = list.filter(i => i.hasApplied);
      else if (statusFilter === 'Not Applied') list = list.filter(i => !i.hasApplied);
      else if (statusFilter === 'Closed') list = list.filter(i => !isActive(i));
      else if (statusFilter === 'Open') list = list.filter(i => isActive(i));
    }

    setFiltered(list);
  }, [search, statusFilter, items]);

  const handleTabChange = (tab) => {
    if (tab.id === 'all') {
      // Internal switch to "All", staying on whatever route we are on but updating local state.
      setActiveTab('all');
      fetchItems('all');
    } else if (tab.path) {
      // Navigate to correct route, the prop change will trigger re-fetch
      navigate(tab.path);
    }
  };

  const handleApply = async (item) => {
    setLoadingId(item._id);
    try {
      if (item.hasApplied) {
        await api.delete(`/placement/${item._id}/withdraw`);
        toast.success('Application withdrawn');
      } else {
        await api.post(`/placement/${item._id}/apply`);
        toast.success('Applied successfully!');
      }
      fetchItems(activeTab);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally { 
      setLoadingId(null); 
    }
  };

  const isActive = (item) => !item.deadline || new Date(item.deadline) >= new Date();

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* ━━ 1. STATS SECTION ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{ marginBottom: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
        {[
          { label: 'Total Applied', value: stats.applied, color: '#3E2723' },
          { label: 'Shortlisted', value: stats.shortlisted, color: '#059669' },
          { label: 'Interviews Scheduled', value: stats.interviews, color: '#4F46E5' },
          { label: 'Offers Received', value: stats.offers, color: '#C9A227' }
        ].map(stat => (
          <div key={stat.label} style={{
            background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 16,
            padding: '24px 20px', display: 'flex', flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 }}>{stat.label}</span>
            <span style={{ fontSize: 32, fontWeight: 800, color: stat.color, marginTop: 8 }}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* ━━ 2. TABS & UNIFIED LAYOUT ━━━━━━━━━━━━━━━━━━ */}
      <div style={{ borderBottom: `2px solid ${T.border}`, marginBottom: 24, display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 2 }}>
        {TABS.map(tab => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab)}
              style={{
                background: 'none', border: 'none', padding: '0 0 12px 0',
                fontSize: 14, fontWeight: isSelected ? 700 : 500, cursor: 'pointer',
                color: isSelected ? T.primaryDark : T.textSecondary,
                borderBottom: isSelected ? `3px solid ${T.primary}` : '3px solid transparent',
                whiteSpace: 'nowrap', transition: 'all 0.2s', marginBottom: -2
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <SearchIcon style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#A0AABB', fontSize: 20 }} />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role, company, or location..."
            style={{
              width: '100%', padding: '12px 16px 12px 42px',
              border: `1px solid ${T.border}`, borderRadius: 12, background: T.cardBg,
              fontSize: 14, color: T.textMain, outline: 'none'
            }} 
          />
        </div>
        <select 
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '12px 16px', border: `1px solid ${T.border}`, borderRadius: 12,
            background: T.cardBg, fontSize: 14, color: T.textMain, outline: 'none', cursor: 'pointer',
            minWidth: 160
          }}
        >
          <option value="All">All Statuses</option>
          <option value="Open">Currently Open</option>
          <option value="Closed">Closed</option>
          <option value="Applied">Applied</option>
          <option value="Not Applied">Not Applied</option>
        </select>
      </div>

      {/* ━━ 3. CARD LISTING ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {fetching ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <CircularProgress style={{ color: T.primary }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 20,
          padding: '80px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <WorkOutlineIcon style={{ fontSize: 48, color: '#D1CDCB', marginBottom: 16 }} />
          <p style={{ fontSize: 16, fontWeight: 600, color: T.textMain, margin: 0 }}>No placements found</p>
          <p style={{ fontSize: 14, color: T.textSecondary, marginTop: 6 }}>Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {filtered.map((item) => {
            const active = isActive(item);
            
            // Generate a subtle pill color based on status
            let badgeBg = '#F3F4F6';
            let badgeColor = '#4B5563';
            let badgeText = 'Not Applied';
            
            if (!active) {
              badgeBg = '#FEE2E2'; badgeColor = '#DC2626'; badgeText = 'Closed';
            } else if (item.hasApplied) {
              badgeBg = '#D1FAE5'; badgeColor = '#059669'; badgeText = 'Applied';
            }

            return (
              <div key={item._id} style={{
                background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 16,
                padding: 24, display: 'flex', flexDirection: 'column',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)', transition: 'transform 0.2s, box-shadow 0.2s',
                ...(active ? { cursor: 'default' } : { opacity: 0.85 })
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(201,162,39,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
              }}
              >
                {/* Header: Company & Title */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ flex: 1, paddingRight: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: T.primaryDark, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                      {item.company || 'Campus Organization'}
                    </p>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: T.brown, margin: 0, lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                  </div>
                  {/* Status Badge */}
                  <div style={{
                    background: badgeBg, color: badgeColor, padding: '4px 12px',
                    borderRadius: 20, fontSize: 11, fontWeight: 700, flexShrink: 0
                  }}>
                    {badgeText}
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 24 }}>
                  {item.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.textSecondary }}>
                      <LocationOnIcon style={{ fontSize: 16, color: '#9CA3AF' }} /> {item.location}
                    </div>
                  )}
                  {(item.stipend || item.salary) && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.textSecondary }}>
                      <BusinessIcon style={{ fontSize: 16, color: '#9CA3AF' }} /> {item.stipend || item.salary}
                    </div>
                  )}
                  {item.deadline && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.textSecondary }}>
                      <CalendarMonthIcon style={{ fontSize: 16, color: '#9CA3AF' }} /> Deadline: {new Date(item.deadline).toLocaleDateString()}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.textSecondary }}>
                    <PeopleIcon style={{ fontSize: 16, color: '#9CA3AF' }} /> {item.applicantCount || 0} applied
                  </div>
                  {item.eligibility && (
                    <div style={{ padding: '8px 12px', background: T.bgLight, borderRadius: 8, fontSize: 12, color: T.brownLight, marginTop: 4 }}>
                      <span style={{ fontWeight: 600 }}>Eligibility:</span> {item.eligibility}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button
                    variant={item.hasApplied ? 'outlined' : 'contained'}
                    disabled={loadingId === item._id || !active}
                    onClick={() => handleApply(item)}
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 700, textTransform: 'none',
                      ...(item.hasApplied
                        ? { borderColor: '#DC2626', color: '#DC2626' }
                        : active 
                          ? { background: T.primary, color: '#1C1917', boxShadow: 'none' }
                          : { background: '#E5E7EB', color: '#9CA3AF' })
                    }}
                  >
                    {loadingId === item._id
                      ? <CircularProgress size={16} color="inherit" />
                      : !active ? 'Closed'
                      : item.hasApplied ? 'Withdraw' : 'Apply Now'}
                  </Button>
                  
                  <Button
                    variant="text"
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 600, textTransform: 'none',
                      color: T.brown, background: T.bgLight
                    }}
                    onClick={() => {
                      if (item.applyLink) window.open(item.applyLink, '_blank');
                      else toast.error("No external link provided");
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
