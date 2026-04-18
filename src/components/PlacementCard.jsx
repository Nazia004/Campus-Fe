import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getCompanyBrand } from '../utils/placementBranding';

export default function PlacementCard({ 
  item, 
  onApply, 
  onViewDetails, 
  loadingId, 
  active 
}) {
  const brand = getCompanyBrand(item.company);
  
  // Status style
  let statusBadge = { bg: 'var(--bg-secondary)', color: 'var(--text-muted)', text: 'Not Applied' };
  if (!active) {
    statusBadge = { bg: '#FEE2E2', color: '#DC2626', text: 'Closed' };
  } else if (item.hasApplied) {
    statusBadge = { bg: '#D1FAE5', color: '#059669', text: 'Applied' };
  }

  const initials = (item.company || 'C').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col p-6 relative overflow-hidden group">
      {/* Brand Accent Stripe */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 opacity-80" 
        style={{ background: brand.color }} 
      />

      {/* Header: Logo & Status */}
      <div className="flex justify-between items-start mb-6">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-transform group-hover:rotate-3"
          style={{ background: brand.lightBg, color: brand.color }}
        >
          {initials}
        </div>
        <div className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full`} style={{ background: statusBadge.bg, color: statusBadge.color }}>
          {statusBadge.text}
        </div>
      </div>

      {/* Title & Company */}
      <div className="mb-5">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          {item.company || 'Campus Drive'}
        </p>
        <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-[var(--primary)] transition-colors">
          {item.title}
        </h3>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <LocationOnIcon sx={{ fontSize: 14, color: brand.color }} />
          <span className="truncate">{item.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <BusinessIcon sx={{ fontSize: 14, color: brand.color }} />
          <span className="truncate">{item.stipend || item.salary || 'Competitive'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarMonthIcon sx={{ fontSize: 14, color: brand.color }} />
          <span className="truncate">{item.deadline ? new Date(item.deadline).toLocaleDateString() : 'No Deadline'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <PeopleIcon sx={{ fontSize: 14, color: brand.color }} />
          <span>{item.applicantCount || 0} applied</span>
        </div>
      </div>

      {/* Eligibility Badge */}
      {item.eligibility && (
        <div className="mb-6 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-tighter">Eligibility</p>
          <p className="text-xs font-bold text-gray-700 truncate">{item.eligibility}</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto flex gap-3">
        <button
          disabled={loadingId === item._id || !active || item.hasApplied}
          onClick={() => onApply(item)}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            item.hasApplied 
              ? 'bg-green-50 text-green-600 border border-green-100' 
              : active 
                ? 'bg-[var(--primary)] text-white hover:shadow-lg hover:-translate-y-0.5' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {loadingId === item._id ? <CircularProgress size={16} color="inherit" /> : active ? (item.hasApplied ? 'Applied' : 'Apply Now') : 'Closed'}
        </button>
        <button
          onClick={() => onViewDetails(item)}
          className="px-4 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-black transition-all group-hover:shadow-md"
        >
          <ArrowForwardIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}
