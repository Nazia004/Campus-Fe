/**
 * Company Branding Utility
 * Maps company names to their brand colors and identifies "Featured" status.
 */

export const COMPANY_BRANDS = {
  'deloitte': {
    color: '#86bc25', // Deloitte Green
    lightBg: 'rgba(134, 188, 37, 0.1)',
    logoColor: '#86bc25'
  },
  'google': {
    color: '#4285F4', // Google Blue
    lightBg: 'rgba(66, 133, 244, 0.1)',
    logoColor: '#4285F4'
  },
  'wipro': {
    color: '#673AB7', // Wipro Purple
    lightBg: 'rgba(103, 58, 183, 0.1)',
    logoColor: '#673AB7'
  },
  'tcs': {
    color: '#003366', // TCS Navy
    lightBg: 'rgba(0, 51, 102, 0.1)',
    logoColor: '#003366'
  },
  'infosys': {
    color: '#007cc3', // Infosys Blue
    lightBg: 'rgba(0, 124, 195, 0.1)',
    logoColor: '#007cc3'
  },
  'amazon': {
    color: '#FF9900', // Amazon Orange
    lightBg: 'rgba(255, 153, 0, 0.1)',
    logoColor: '#FF9900'
  },
  'microsoft': {
    color: '#00A4EF', // Microsoft Blue
    lightBg: 'rgba(0, 164, 239, 0.1)',
    logoColor: '#00A4EF'
  },
  'tata': {
    color: '#003366',
    lightBg: 'rgba(0, 51, 102, 0.1)'
  }
};

export const getCompanyBrand = (companyName) => {
  if (!companyName) return { color: 'var(--primary)', lightBg: 'var(--nav-hover-bg)' };
  
  const key = companyName.toLowerCase().split(' ')[0];
  return COMPANY_BRANDS[key] || {
    color: 'var(--primary)',
    lightBg: 'var(--nav-hover-bg)'
  };
};

export const getFeaturedLogo = (companyName) => {
  if (!companyName) return null;
  const brand = getCompanyBrand(companyName);
  return brand.logo;
};
