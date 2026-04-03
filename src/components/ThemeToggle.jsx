import useDarkMode from '../hooks/useDarkMode';

export default function ThemeToggle() {
  const [dark, toggleDark] = useDarkMode();

  return (
    <button
      onClick={toggleDark}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: '100%',
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px', borderRadius: 12,
        fontSize: 14, fontWeight: 500,
        color: '#C9A227',
        background: 'rgba(201,162,39,0.1)',
        border: '1px solid rgba(201,162,39,0.3)',
        cursor: 'pointer',
        marginBottom: 4,
        transition: 'all 0.2s',
      }}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.22)'; }}
      onMouseOut={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.1)'; }}
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>{dark ? '☀️' : '🌙'}</span>
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
