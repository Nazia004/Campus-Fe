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
        fontSize: 14, fontWeight: 700,
        color: 'var(--primary)',
        background: 'rgba(198,90,46,0.1)',
        border: '1px solid rgba(198,90,46,0.25)',
        cursor: 'pointer',
        marginBottom: 4,
        transition: 'all 0.2s',
      }}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(198,90,46,0.18)'; }}
      onMouseOut={e => { e.currentTarget.style.background = 'rgba(198,90,46,0.1)'; }}
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>{dark ? '☀️' : '🌙'}</span>
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
