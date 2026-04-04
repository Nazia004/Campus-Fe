import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const T = {
  primary: '#C9A227',    // Gold
  primaryDark: '#A67C00', // Darker Gold
  brown: '#3E2723',      // Dark Brown
  bgLight: '#FAF3E0',    // Beige background
  cardBg: '#FFFFFF',     // White
  textMain: '#2D2D2D',
  textSecondary: '#6D6D6D',
  border: '#E8DCCB',
};

export default function PlacementDetailsModal({
  open,
  onClose,
  item,
  loadingId,
  onApply,
  onOpenApply
}) {
  if (!item) return null;

  const isActive = !item.deadline || new Date(item.deadline) >= new Date();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 20,
          background: T.cardBg,
          boxShadow: '0 24px 60px rgba(62, 39, 35, 0.15)',
        }
      }}
    >
      <div style={{ position: 'relative', padding: '32px 32px 24px 32px', borderBottom: `1px solid ${T.border}`}}>
        <IconButton 
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, color: T.textSecondary }}
        >
          <CloseIcon />
        </IconButton>

        <p style={{ fontSize: 13, fontWeight: 800, color: T.primaryDark, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          {item.company || 'Campus Organization'}
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: T.brown, margin: 0, lineHeight: 1.2 }}>
          {item.title}
        </h2>

        <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
          <span style={{
            background: isActive ? '#ECFCCB' : '#FEE2E2', 
            color: isActive ? '#4D7C0F' : '#DC2626', 
            padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700
          }}>
            {isActive ? 'Open for Applications' : 'Closed'}
          </span>
          {item.hasApplied && (
            <span style={{
              background: '#D1FAE5', color: '#059669', 
              padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 4
            }}>
              <CheckCircleIcon style={{ fontSize: 14 }} /> Applied
            </span>
          )}
        </div>
      </div>

      <DialogContent style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Meta Grid */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20,
          background: T.bgLight, padding: 24, borderRadius: 16
        }}>
          {item.location && (
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: T.textSecondary, marginBottom: 4 }}>LOCATION</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: T.textMain, fontWeight: 500 }}>
                <LocationOnIcon style={{ fontSize: 18, color: T.primaryDark }} /> {item.location}
              </div>
            </div>
          )}
          {(item.stipend || item.salary) && (
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: T.textSecondary, marginBottom: 4 }}>
                {item.type === 'internship' ? 'STIPEND' : 'SALARY'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: T.textMain, fontWeight: 500 }}>
                <BusinessIcon style={{ fontSize: 18, color: T.primaryDark }} /> {item.stipend || item.salary}
              </div>
            </div>
          )}
          {item.deadline && (
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: T.textSecondary, marginBottom: 4 }}>DEADLINE</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: T.textMain, fontWeight: 500 }}>
                <CalendarMonthIcon style={{ fontSize: 18, color: T.primaryDark }} /> {new Date(item.deadline).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: T.brown, marginBottom: 12 }}>Description & Role Overview</h3>
          <div style={{ 
            fontSize: 14, color: T.textMain, lineHeight: 1.6, 
            whiteSpace: 'pre-wrap' 
          }}>
            {item.description || 'No detailed description provided for this listing.'}
          </div>
        </div>

        {/* Requirements / Eligibility */}
        {item.eligibility && (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: T.brown, marginBottom: 12 }}>Eligibility Criteria</h3>
            <div style={{ fontSize: 14, color: T.textMain, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {item.eligibility}
            </div>
          </div>
        )}
      </DialogContent>

      <DialogActions style={{ padding: '24px 32px', borderTop: `1px solid ${T.border}` }}>
        <Button 
          onClick={onClose} 
          style={{ color: T.textSecondary, fontWeight: 600, textTransform: 'none', marginRight: 'auto' }}
        >
          Cancel
        </Button>
        
        {item.applyLink && (
          <Button 
            variant="outlined"
            onClick={() => window.open(item.applyLink, '_blank')}
            style={{ 
              color: T.brown, borderColor: T.border, fontWeight: 600, textTransform: 'none', borderRadius: 8, padding: '8px 24px' 
            }}
          >
            Official Website
          </Button>
        )}

        <Button
          variant={item.hasApplied ? 'outlined' : 'contained'}
          disabled={loadingId === item._id || !isActive || item.hasApplied}
          onClick={() => onOpenApply(item)}
          style={{
            padding: '8px 32px', borderRadius: 8, fontSize: 14, fontWeight: 700, textTransform: 'none',
            ...(item.hasApplied
              ? { borderColor: '#d1fae5', color: '#059669', background: '#f0fdf4' }
              : isActive 
                ? { background: T.primary, color: '#1C1917', boxShadow: 'none' }
                : { background: '#E5E7EB', color: '#9CA3AF' })
          }}
        >
          {loadingId === item._id
            ? <CircularProgress size={20} color="inherit" />
            : !isActive ? 'Closed'
            : item.hasApplied ? 'Applied' : 'Apply Now'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
