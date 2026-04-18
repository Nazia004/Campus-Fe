// ─── CampusHub Global Theme (CSS variable-based) ─────────────────────────────
// All values reference CSS variables defined in index.css
// Dark mode is applied by adding .dark class to <html> via useDarkMode hook

export const T = {
  navy:       'var(--color-primary-dark)',
  aqua:       'var(--color-primary)',
  aquaDark:   'var(--color-primary-dark)',
  aquaLight:  'var(--color-primary-light)',
  bg:         'var(--color-bg)',
  card:       'var(--color-surface)',
  border:     'var(--color-border)',
  text:       'var(--color-text-primary)',
  textMuted:  'var(--color-text-secondary)',
  sidebarBg:  'var(--sidebar-bg)',
  inputBg:    'var(--input-bg)',
  hoverRow:   'var(--card-bg-hover)',

  // Sidebar states
  sidebarActive:   { background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', borderLeft: '3px solid var(--color-primary)' },
  sidebarInactive: { background: 'transparent', color: 'var(--color-text-secondary)', borderLeft: '3px solid transparent' },

  // Table header
  tableHead: { background: 'var(--color-primary-dark)' },

  // Buttons
  btnPrimary: { background: 'var(--color-primary)',  color: '#fff' },
  btnNavy:    { background: 'var(--color-primary-dark)',  color: '#fff' },
};
