import { CircularProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CLUB_IMAGE_MAP, FALLBACK_IMAGES } from '../utils/clubImages';



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
  const mappedImage = CLUB_IMAGE_MAP[c.name];
  const imgSrc = mappedImage || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];

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
            <CalendarMonthIcon sx={{ fontSize: 13, color: '#C9A227' }} />
            <span>Established 2024</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <LocationOnIcon sx={{ fontSize: 13, color: '#C9A227' }} />
            <span className="truncate">{c.venue || 'Campus Grounds'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <PeopleIcon sx={{ fontSize: 13, color: '#C9A227' }} />
            <span>{c.memberCount || 0} members</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-400">Club capacity</span>
            <span className={`font-semibold ${
              Math.min(100, ((c.memberCount || 0) / 100) * 100) >= 90 ? 'text-red-500' : Math.min(100, ((c.memberCount || 0) / 100) * 100) >= 60 ? 'text-yellow-500' : 'text-green-600'
            }`}>{Math.min(100, ((c.memberCount || 0) / 100) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                Math.min(100, ((c.memberCount || 0) / 100) * 100) >= 90 ? 'bg-red-500' : Math.min(100, ((c.memberCount || 0) / 100) * 100) >= 60 ? 'bg-yellow-400' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(100, ((c.memberCount || 0) / 100) * 100)}%` }}
            />
          </div>
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
