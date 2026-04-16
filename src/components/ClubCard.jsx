import { CircularProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CLUB_IMAGES = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=300&fit=crop',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=300&fit=crop',
];

function getIndex(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h);
}

export default function ClubCard({
  club,
  isClubRole = false,
  onJoin,
  onEdit,
  onDelete,
  onView,
  onViewDetails,
  loadingId,
}) {
  const c = club;
  const idx = getIndex(c.name);
  const imgSrc = CLUB_IMAGES[idx % CLUB_IMAGES.length];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* ── Cover Image ── */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgSrc}
          alt={c.name}
          className="w-full h-full object-cover"
          onError={(ev) => {
            ev.target.style.display = 'none';
            ev.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* fallback */}
        <div className="absolute inset-0 hidden items-center justify-center bg-gray-200">
        </div>
        {/* subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Status badge — bottom left */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {c.category && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 shadow-sm">
              {c.category}
            </span>
          )}
          {c.isJoined && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: '#FAF3E0', color: 'var(--primary)' }}>
              ✓ Joined
            </span>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{c.name}</h3>

        {/* Description length increased to 4 lines */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 mb-4 flex-1">
          {c.description || 'No description provided.'}
        </p>

        {/* Meta Section */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <PeopleIcon sx={{ fontSize: 13, color: '#C9A227' }} />
            <span>{c.memberCount || 0} members</span>
          </div>
          {c.venue && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <LocationOnIcon sx={{ fontSize: 13, color: '#C9A227' }} />
              <span className="truncate">{c.venue}</span>
            </div>
          )}
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col gap-2 mt-auto">
          {/* View Details — everyone */}
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(c)}
              className="w-full py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              style={{ background: 'var(--primary)', color: '#1C1917' }}
            >
              View Details <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </button>
          )}

          {/* Club-role row */}
          {isClubRole && (
            <div className="flex gap-2">
              {onView && (
                <button onClick={() => onView(c)} className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 py-2 rounded-xl transition-colors">
                  <VisibilityIcon sx={{ fontSize: 13 }} /> Members
                </button>
              )}
              <button onClick={() => onEdit(c)} className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-2 rounded-xl transition-colors" style={{ color: 'var(--primary)', background: '#FAF3E0' }}>
                <EditIcon sx={{ fontSize: 13 }} /> Edit
              </button>
              <button onClick={() => onDelete(c._id)} className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 py-2 rounded-xl transition-colors">
                <DeleteIcon sx={{ fontSize: 13 }} /> Delete
              </button>
            </div>
          )}

          {/* Student join/leave */}
          {!isClubRole && (
            <button
              disabled={loadingId === c._id}
              onClick={() => onJoin(c)}
              className={`w-full py-2 rounded-xl text-sm font-semibold transition-colors ${
                c.isJoined
                  ? 'border border-red-400 text-red-500 hover:bg-red-50'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {loadingId === c._id
                ? <CircularProgress size={13} sx={{ color: 'inherit' }} />
                : c.isJoined ? 'Leave Club' : 'Join Club'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
