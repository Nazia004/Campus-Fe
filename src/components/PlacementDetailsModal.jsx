import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { getCompanyBrand } from '../utils/placementBranding';

export default function PlacementDetailsModal({
  open,
  onClose,
  item,
  loadingId,
  onApply,
  onOpenApply
}) {
  if (!item) return null;

  const brand = getCompanyBrand(item.company);
  const isActive = !item.deadline || new Date(item.deadline) >= new Date();
  const initials = (item.company || 'C').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 32,
          background: '#fff',
          boxShadow: '0 40px 100px rgba(0,0,0,0.15)',
          overflow: 'hidden'
        }
      }}
    >
      <div style={{ position: 'relative', padding: '40px 40px 0 40px' }}>
        <IconButton 
          onClick={onClose}
          style={{ position: 'absolute', top: 24, right: 24, color: '#9CA3AF' }}
        >
          <CloseIcon />
        </IconButton>

        <div className="flex items-center gap-5 mb-8">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl"
            style={{ background: brand.lightBg, color: brand.color }}
          >
            {initials}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: brand.color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>
              {item.company || 'Direct Recruitment'}
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#111827', margin: 0, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              {item.title}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span style={{
            background: isActive ? '#ECFCCB' : '#FEE2E2', 
            color: isActive ? '#15803D' : '#DC2626', 
            padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5
          }}>
            {isActive ? 'Accepting Applications' : 'Closed'}
          </span>
          {item.hasApplied && (
            <span style={{
              background: '#D1FAE5', color: '#065F46', 
              padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 800,
              display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase', letterSpacing: 0.5
            }}>
              <CheckCircleIcon style={{ fontSize: 14 }} /> Already Applied
            </span>
          )}
        </div>
      </div>

      <DialogContent style={{ padding: '40px' }}>
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1,
          background: '#F3F4F6', borderRadius: 24, padding: 1, overflow: 'hidden'
        }}>
          {[
            { label: 'Location', value: item.location, icon: <LocationOnIcon /> },
            { label: item.type === 'internship' ? 'Stipend' : 'Remuneration', value: item.stipend || item.salary || 'Competitive', icon: <BusinessIcon /> },
            { label: 'Closing Date', value: item.deadline ? new Date(item.deadline).toLocaleDateString() : 'N/A', icon: <CalendarMonthIcon /> },
          ].map((meta, idx) => (
            <div key={idx} style={{ background: '#fff', padding: '20px 24px' }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 }}>{meta.label}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#374151', fontWeight: 700 }}>
                <span style={{ color: brand.color }}>{meta.icon}</span> {meta.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
           <div className="flex items-center gap-3 mb-4">
             <div className="w-1.5 h-6 rounded-full" style={{ background: brand.color }} />
             <h3 style={{ fontSize: 18, fontWeight: 900, color: '#111827', margin: 0 }}>Role Overview</h3>
           </div>
           <div style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontWeight: 500 }}>
             {item.description || 'Our team is looking for passionate individuals to join our growing organization. No further details provided at this time.'}
           </div>
        </div>

        {item.eligibility && (
          <div style={{ marginTop: 32 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-6 rounded-full" style={{ background: brand.color }} />
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#111827', margin: 0 }}>Candidate Profile</h3>
            </div>
            <div style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.8, padding: '20px', background: brand.lightBg, borderRadius: 16, border: `1px dashed ${brand.color}66` }}>
              {item.eligibility}
            </div>
          </div>
        )}
      </DialogContent>

      <DialogActions style={{ padding: '0 40px 40px 40px', justifyContent: 'flex-start', gap: 16 }}>
        <Button
          variant="contained"
          disabled={loadingId === item._id || !isActive || item.hasApplied}
          onClick={() => onOpenApply(item)}
          style={{
            minWidth: 180, padding: '14px 24px', borderRadius: 16, fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1,
            background: isActive && !item.hasApplied ? 'var(--primary)' : '#E5E7EB',
            color: isActive && !item.hasApplied ? '#fff' : '#9CA3AF',
            boxShadow: isActive && !item.hasApplied ? '0 10px 30px rgba(198,90,46,0.3)' : 'none'
          }}
        >
          {loadingId === item._id
            ? <CircularProgress size={20} color="inherit" />
            : !isActive ? 'Closed'
            : item.hasApplied ? 'Already Applied' : 'Start Application'}
        </Button>

        {item.applyLink && (
          <Button 
            variant="outlined"
            onClick={() => window.open(item.applyLink, '_blank')}
            style={{ 
              padding: '14px 24px', borderRadius: 16, fontSize: 13, fontWeight: 800, textTransform: 'none', borderColor: '#E5E7EB', color: '#374151'
            }}
          >
            Visit Website
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
