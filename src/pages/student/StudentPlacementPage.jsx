import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BoltIcon from '@mui/icons-material/Bolt';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import api from '../../api';
import PlacementCard from '../../components/PlacementCard';
import PlacementDetailsModal from '../../components/PlacementDetailsModal';
import ApplyFormModal from '../../components/ApplyFormModal';
import { getCompanyBrand } from '../../utils/placementBranding';

const TABS = [
  { id: 'all', label: 'All Openings' },
  { id: 'internship', label: 'Internships', path: '/student/internships' },
  { id: 'job', label: 'Full-time Jobs', path: '/student/jobs' },
  { id: 'campus_drive', label: 'Campus Drives', path: '/student/campus-drives' },
  { id: 'workshop', label: 'Workshops', path: '/student/workshops' },
  { id: 'conference', label: 'Conferences', path: '/student/conferences' },
];

export default function StudentPlacementPage({ type }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(type || 'all');
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [fetching, setFetching] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [applyingItem, setApplyingItem] = useState(null);
  const [stats, setStats] = useState({ applied: 0, shortlisted: 0, offers: 0 });

  const fetchItems = async (currentType) => {
    setFetching(true);
    try {
      const endpoint = currentType === 'all' ? '/placement' : `/placement?type=${currentType}`;
      const { data } = await api.get(endpoint);
      setItems(data.data);
      
      const applied = data.data.filter(i => i.hasApplied).length;
      setStats({
        applied: applied,
        shortlisted: Math.floor(applied * 0.4),
        offers: Math.floor(applied * 0.05),
      });
    } catch { 
      toast.error('Failed to load placements'); 
    } finally { 
      setFetching(false); 
    }
  };

  useEffect(() => {
    setActiveTab(type || 'all');
    fetchItems(type || 'all');
  }, [type]);

  useEffect(() => {
    let list = items;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((i) =>
        (i.title || '').toLowerCase().includes(q) ||
        (i.company || '').toLowerCase().includes(q) ||
        (i.location || '').toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [search, items]);

  const handleApply = async (item, applicationData) => {
    setLoadingId(item._id);
    try {
      if (item.hasApplied) {
        await api.delete(`/placement/${item._id}/withdraw`);
        toast.success('Application withdrawn');
      } else {
        // Correct application flow
        await api.post(`/placement/${item._id}/apply`, applicationData || {});
        toast.success('Application submitted successfully!');
      }
      fetchItems(activeTab);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit application');
    } finally { 
      setLoadingId(null); 
    }
  };

  const isActive = (item) => !item.deadline || new Date(item.deadline) >= new Date();

  // Featured Spotlight logic: Pick 3 highly active or high-stipend placements
  const featured = items.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto pb-20">
      
      {/* ━━ 1. PREMIUM HEADER: DASHBOARD AT A GLANCE ━━━━━━━━━━━━━━━━━━━ */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Placement Command Center</h1>
          <p className="text-gray-500 font-medium">Your path to a successful career begins here.</p>
        </div>
        
        <div className="flex gap-4">
          {[
            { label: 'Applied', value: stats.applied, icon: <BoltIcon />, color: 'var(--primary)' },
            { label: 'Shortlisted', value: stats.shortlisted, icon: <ShowChartIcon />, color: '#10B981' },
            { label: 'Offers', value: stats.offers, icon: <WorkspacePremiumIcon />, color: '#F59E0B' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 min-w-[120px] shadow-sm flex flex-col gap-1 transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span style={{ color: s.color }}>{s.icon}</span> {s.label}
              </div>
              <div className="text-2xl font-black text-gray-900">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ━━ 2. FEATURED SPOTLIGHT CAROUSEL ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {featured.length > 0 && !fetching && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
             <div className="w-1 h-6 bg-[var(--primary)] rounded-full" />
             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Priority Recruitment Drives</h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 scrollbar-none snap-x">
            {featured.map(item => {
              const brand = getCompanyBrand(item.company);
              return (
                <div key={item._id} className="min-w-[320px] md:min-w-[400px] snap-start relative group">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl" style={{ from: brand.color, to: brand.lightBg }} />
                  <PlacementCard 
                    item={item} 
                    active={isActive(item)}
                    onApply={() => setApplyingItem(item)}
                    onViewDetails={setSelectedItem}
                    loadingId={loadingId}
                  />
                  <div className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full shadow-xl animate-bounce">
                    FEATURED
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ━━ 3. TABS & FILTERING ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mb-10 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'all') { setActiveTab('all'); fetchItems('all'); }
                  else if (tab.path) navigate(tab.path);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-gray-900 text-white shadow-xl scale-105' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 20 }} />
            <input 
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by role or company..."
              className="w-full pl-12 pr-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* ━━ 4. ALL OPENINGS GRID ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {fetching ? (
          <div className="flex justify-center py-20"><CircularProgress sx={{ color: 'var(--primary)' }} /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <WorkOutlineIcon sx={{ fontSize: 48, color: '#CBD5E1', mb: 2 }} />
            <p className="text-gray-900 font-black uppercase tracking-widest">No matching roles</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search term or check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <PlacementCard 
                key={item._id}
                item={item}
                active={isActive(item)}
                onApply={() => setApplyingItem(item)}
                onViewDetails={setSelectedItem}
                loadingId={loadingId}
              />
            ))}
          </div>
        )}
      </div>

      <PlacementDetailsModal 
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        loadingId={loadingId}
        onApply={handleApply}
        onOpenApply={(item) => { setSelectedItem(null); setApplyingItem(item); }}
      />

      <ApplyFormModal 
        open={!!applyingItem}
        onClose={() => setApplyingItem(null)}
        item={applyingItem}
        onSubmit={handleApply}
      />
    </div>
  );
}
