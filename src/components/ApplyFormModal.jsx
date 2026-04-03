import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: `1px solid ${T.border}`,
  background: '#F9F9F9',
  fontSize: 14,
  color: T.textMain,
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 700,
  color: T.brown,
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

export default function ApplyFormModal({ open, onClose, item, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    branch: '',
    year: '',
    cgpa: '',
    skills: '',
    coverLetter: ''
  });
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!item) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else if (file) {
      alert("Please upload a valid PDF file.");
    }
  };

  const isValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.branch.trim() !== '' &&
      formData.year.trim() !== '' &&
      formData.cgpa.trim() !== '' &&
      resume !== null
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    
    setIsSubmitting(true);
    try {
      // 1. Upload resume PDF to backend → Cloudinary
      const uploadData = new FormData();
      uploadData.append('resume', resume);

      const token = localStorage.getItem('token');
      const cloudRes = await fetch('https://campus-be-akqn.onrender.com/api/upload/resume', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData,
      });
      const cloudData = await cloudRes.json();
      if (!cloudRes.ok) throw new Error(cloudData.message || 'Resume upload failed');

      // 2. Submit application with all form data + Cloudinary URL
      await onSubmit(item, { ...formData, resumeUrl: cloudData.url });
    } catch (err) {
      alert(err.message || 'Application failed. Please try again.');
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={!isSubmitting ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 20,
          background: T.cardBg,
          boxShadow: '0 24px 60px rgba(62, 39, 35, 0.15)',
        }
      }}
    >
      <div style={{ padding: '24px 32px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.brown, margin: 0 }}>Apply Now</h2>
          <p style={{ fontSize: 13, color: T.textSecondary, margin: '4px 0 0 0' }}>{item.title} at {item.company}</p>
        </div>
        <IconButton onClick={onClose} disabled={isSubmitting} style={{ color: T.textSecondary }}>
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent style={{ padding: 0 }}>
        <form id="placement-application-form" onSubmit={handleSubmit} style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Basic Info */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: T.primaryDark, marginBottom: 16, borderBottom: `2px solid ${T.border}`, paddingBottom: 8 }}>Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Full Name *</label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} style={inputStyle} placeholder="John Doe" required />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com" required />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="+1 234 567 890" required />
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: T.primaryDark, marginBottom: 16, borderBottom: `2px solid ${T.border}`, paddingBottom: 8 }}>Academic Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Branch *</label>
                <input name="branch" value={formData.branch} onChange={handleChange} style={inputStyle} placeholder="e.g. CSE" required />
              </div>
              <div>
                <label style={labelStyle}>Year *</label>
                <select name="year" value={formData.year} onChange={handleChange} style={inputStyle} required>
                  <option value="" disabled>Select</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>CGPA *</label>
                <input type="number" step="0.01" max="10" name="cgpa" value={formData.cgpa} onChange={handleChange} style={inputStyle} placeholder="8.5" required />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: T.primaryDark, marginBottom: 16, borderBottom: `2px solid ${T.border}`, paddingBottom: 8 }}>Additional Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Skills (Optional)</label>
                <input name="skills" value={formData.skills} onChange={handleChange} style={inputStyle} placeholder="React, Node.js, Python..." />
              </div>
              <div>
                <label style={labelStyle}>Cover Letter (Optional)</label>
                <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} placeholder="Why are you a good fit?" />
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: T.primaryDark, marginBottom: 16, borderBottom: `2px solid ${T.border}`, paddingBottom: 8 }}>Resume Document *</h3>
            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '32px 24px', border: `2px dashed ${resume ? '#059669' : T.primaryDark}`, borderRadius: 12,
              background: resume ? '#ECFDF5' : T.bgLight, cursor: 'pointer', transition: 'all 0.2s',
              textAlign: 'center'
            }}>
              {resume ? (
                <>
                  <CheckCircleIcon style={{ fontSize: 32, color: '#059669', marginBottom: 8 }} />
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#065F46' }}>{resume.name}</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#10B981' }}>Click to replace file</p>
                </>
              ) : (
                <>
                  <CloudUploadIcon style={{ fontSize: 32, color: T.primaryDark, marginBottom: 8 }} />
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: T.brown }}>Upload Resume (PDF format only)</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: 12, color: T.textSecondary }}>File size limit: 5MB</p>
                </>
              )}
              <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
            </label>
          </div>

        </form>
      </DialogContent>

      <DialogActions style={{ padding: '24px 32px', borderTop: `1px solid ${T.border}`, background: '#FAFAFA' }}>
        <Button 
          onClick={onClose} 
          disabled={isSubmitting}
          style={{ color: T.textSecondary, fontWeight: 600, textTransform: 'none', marginRight: 'auto' }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="placement-application-form"
          disabled={!isValid() || isSubmitting}
          style={{
            padding: '10px 32px', borderRadius: 8, fontSize: 14, fontWeight: 700, textTransform: 'none',
            background: (!isValid() || isSubmitting) ? '#E5E7EB' : T.primary,
            color: (!isValid() || isSubmitting) ? '#9CA3AF' : '#1C1917',
            boxShadow: (!isValid() || isSubmitting) ? 'none' : '0 4px 14px rgba(201,162,39,0.3)',
            transition: 'all 0.2s'
          }}
        >
          {isSubmitting ? <CircularProgress size={20} style={{ color: T.brown }} /> : 'Submit Application'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
