import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InsightsIcon from '@mui/icons-material/Insights';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// ── Theme tokens ──────────────────────────────────────────────────────────────
const T = {
  bg:          '#FAF3E0',
  bgAlt:       '#F5EDD4',
  bgCard:      '#FFFFFF',
  sidebar:     '#EDE0C4',
  primary:     '#C9A227',
  primaryDark: '#3E2723',
  accent:      '#A67C00',
  textMain:    '#2D2D2D',
  textLight:   '#6D6D6D',
  border:      '#E8DCCB',
  gold10:      'rgba(201,162,39,0.10)',
  gold20:      'rgba(201,162,39,0.20)',
  gold40:      'rgba(201,162,39,0.40)',
};

const FEATURES = [
  { icon: <SchoolIcon sx={{ fontSize: 32 }} />,             title: 'Student Portal',  desc: 'Access academic records, attendance, timetables and announcements all in one place.' },
  { icon: <GroupsIcon sx={{ fontSize: 32 }} />,             title: 'Club Management', desc: 'Discover, join and manage college clubs. Post events and connect with members.' },
  { icon: <WorkIcon sx={{ fontSize: 32 }} />,               title: 'Placement Cell',  desc: 'Browse job listings, apply for internships and track your placement journey.' },
  { icon: <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />, title: 'Admin Control',   desc: 'Manage users, monitor activity and configure the entire campus platform.' },
];

const STATS = [
  { value: '5,000+', label: 'Students Enrolled' },
  { value: '120+',   label: 'Active Clubs' },
  { value: '300+',   label: 'Placements This Year' },
  { value: '98%',    label: 'Satisfaction Rate' },
];

const HIGHLIGHTS = [
  'Real-time notifications & announcements',
  'Secure role-based access control',
  'Placement tracking & analytics',
  'Club event management',
  'Academic performance insights',
  'Mobile-friendly responsive design',
];

const LOGIN_CARDS = [
  { role: 'student',   label: 'Student',   icon: <SchoolIcon />,             desc: 'Access your academic portal' },
  { role: 'club',      label: 'Club',       icon: <GroupsIcon />,             desc: 'Manage your club activities' },
  { role: 'placement', label: 'Placement',  icon: <WorkIcon />,               desc: 'Placement cell dashboard' },
  { role: 'admin',     label: 'Admin',      icon: <AdminPanelSettingsIcon />, desc: 'Full platform control' },
];

const card = {
  background: T.bgCard,
  border: `1px solid ${T.border}`,
  borderRadius: 16,
  boxShadow: '0 2px 12px rgba(62,39,35,0.08)',
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: 'Inter, sans-serif' }}>

      {/* ── Navbar ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(250,243,224,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${T.border}`, padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(62,39,35,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 8px ${T.gold40}` }}>
            <SchoolIcon sx={{ fontSize: 18, color: T.primaryDark }} />
          </div>
          <span style={{ fontSize: 17, fontWeight: 700, color: T.primaryDark }}>CampusHub</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          style={{ background: T.primary, color: T.primaryDark, border: 'none', borderRadius: 10, padding: '8px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: `0 2px 10px ${T.gold40}`, transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={e => { e.currentTarget.style.background = T.primary; e.currentTarget.style.color = T.primaryDark; e.currentTarget.style.transform = 'none'; }}
        >
          Sign In
        </button>
      </nav>

      {/* ── Hero ── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: `linear-gradient(135deg, ${T.bg} 0%, ${T.bgAlt} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 60, right: -40, width: 360, height: 360, background: T.gold10, borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: 20, width: 280, height: 280, background: T.gold10, borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', background: T.gold20, border: `1px solid ${T.gold40}`, color: T.accent, fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 20, marginBottom: 24 }}>
            🎓 All-in-one Campus Platform
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem,5.5vw,3.6rem)', fontWeight: 800, color: T.primaryDark, lineHeight: 1.15, marginBottom: 20 }}>
            Your Campus,{' '}
            <span style={{ color: T.primary }}>Reimagined</span>
          </h1>
          <p style={{ fontSize: 17, color: T.textLight, maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.7 }}>
            CampusHub brings students, clubs, placement cell and administration together on a single unified platform — streamlining every aspect of college life.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/login')}
              style={{ background: T.primary, color: T.primaryDark, border: 'none', borderRadius: 12, padding: '13px 30px', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 18px ${T.gold40}`, display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = T.primary; e.currentTarget.style.color = T.primaryDark; e.currentTarget.style.transform = 'none'; }}
            >
              Get Started Free <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </button>
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'transparent', color: T.textMain, border: `1px solid ${T.border}`, borderRadius: 12, padding: '13px 30px', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.color = T.primary; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMain; }}
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* Hero visual */}
        <div style={{ maxWidth: 880, margin: '56px auto 0', position: 'relative', zIndex: 1 }}>
          <div style={{ ...card, overflow: 'hidden', boxShadow: '0 8px 40px rgba(62,39,35,0.12)' }}>
            <div style={{ background: T.bgAlt, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#10B981' }} />
              <div style={{ flex: 1, marginLeft: 12, background: T.bgCard, borderRadius: 6, padding: '3px 12px', fontSize: 11, color: T.textLight, border: `1px solid ${T.border}` }}>campushub.edu.in/dashboard</div>
            </div>
            <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
              {[
                { label: 'Total Students', value: '5,248', icon: <SchoolIcon sx={{ fontSize: 18 }} /> },
                { label: 'Active Clubs',   value: '124',   icon: <GroupsIcon sx={{ fontSize: 18 }} /> },
                { label: 'Job Listings',   value: '89',    icon: <WorkIcon sx={{ fontSize: 18 }} /> },
                { label: 'Notifications',  value: '12 New',icon: <NotificationsActiveIcon sx={{ fontSize: 18 }} /> },
              ].map((c) => (
                <div key={c.label} style={{ background: T.gold10, border: `1px solid ${T.border}`, borderRadius: 12, padding: 14 }}>
                  <div style={{ color: T.primary, marginBottom: 6 }}>{c.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: T.primaryDark }}>{c.value}</div>
                  <div style={{ fontSize: 11, color: T.textLight, marginTop: 3 }}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {[
                { title: 'Upcoming: Tech Fest 2025',      tag: 'Event' },
                { title: 'TCS Campus Drive — Apply Now',  tag: 'Placement' },
                { title: 'Semester Results Published',    tag: 'Academic' },
              ].map((item) => (
                <div key={item.title} style={{ background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 12, padding: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: T.gold20, color: T.accent }}>{item.tag}</span>
                  <p style={{ fontSize: 13, fontWeight: 500, color: T.textMain, marginTop: 8, marginBottom: 0 }}>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '56px 24px', background: T.primary }}>
        <div style={{ maxWidth: 880, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, textAlign: 'center' }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 34, fontWeight: 800, color: T.primaryDark, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: T.primaryDark, fontWeight: 500, opacity: 0.75 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '88px 24px', background: T.bg }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ display: 'inline-block', background: T.gold20, border: `1px solid ${T.gold40}`, color: T.accent, fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 20, marginBottom: 14 }}>Features</span>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: T.primaryDark, marginBottom: 10 }}>Everything your campus needs</h2>
            <p style={{ color: T.textLight, maxWidth: 480, margin: '0 auto' }}>Four powerful portals, one seamless experience for every stakeholder.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 22 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ ...card, padding: 30, cursor: 'default', transition: 'all 0.25s' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 36px rgba(201,162,39,0.18)`; e.currentTarget.style.borderColor = T.primary; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(62,39,35,0.08)'; e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{ width: 54, height: 54, borderRadius: 14, background: T.gold20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: T.primary }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: T.primaryDark, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: T.textLight, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section style={{ padding: '88px 24px', background: T.bgAlt }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-block', background: T.gold20, border: `1px solid ${T.gold40}`, color: T.accent, fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 20, marginBottom: 14 }}>Why CampusHub</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: T.primaryDark, marginBottom: 14, lineHeight: 1.2 }}>Built for modern campus life</h2>
            <p style={{ color: T.textLight, marginBottom: 28, lineHeight: 1.7 }}>
              Designed from the ground up to handle the complexity of a modern educational institution — with security, speed and simplicity at its core.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {HIGHLIGHTS.map((h) => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircleIcon sx={{ color: T.primary, fontSize: 20 }} />
                  <span style={{ color: T.textMain, fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: <InsightsIcon sx={{ fontSize: 26 }} />,             title: 'Analytics',    desc: 'Track performance metrics across all departments' },
              { icon: <SecurityIcon sx={{ fontSize: 26 }} />,             title: 'Secure',       desc: 'Role-based access with JWT authentication' },
              { icon: <NotificationsActiveIcon sx={{ fontSize: 26 }} />,  title: 'Real-time',    desc: 'Instant notifications for events and updates' },
              { icon: <EmojiEventsIcon sx={{ fontSize: 26 }} />,          title: 'Achievements', desc: 'Celebrate student and club milestones' },
            ].map((c) => (
              <div key={c.title} style={{ ...card, padding: 22, transition: 'all 0.25s' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = T.primary; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 12, background: T.gold20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, color: T.primary }}>
                  {c.icon}
                </div>
                <h4 style={{ fontWeight: 700, color: T.primaryDark, marginBottom: 5, fontSize: 14 }}>{c.title}</h4>
                <p style={{ fontSize: 12, color: T.textLight, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Login Cards ── */}
      <section style={{ padding: '88px 24px', background: T.bg }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span style={{ display: 'inline-block', background: T.gold20, border: `1px solid ${T.gold40}`, color: T.accent, fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 20, marginBottom: 14 }}>Get Started</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: T.primaryDark, marginBottom: 10 }}>Choose your portal</h2>
            <p style={{ color: T.textLight }}>Select your role to access your personalized dashboard.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
            {LOGIN_CARDS.map((c) => (
              <button
                key={c.role}
                onClick={() => navigate('/login', { state: { role: c.role } })}
                style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 16, padding: 22, textAlign: 'left', cursor: 'pointer', transition: 'all 0.25s', boxShadow: '0 2px 10px rgba(62,39,35,0.07)' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.boxShadow = `0 10px 30px ${T.gold20}`; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = '0 2px 10px rgba(62,39,35,0.07)'; }}
              >
                <div style={{ width: 46, height: 46, background: T.gold20, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, color: T.primary }}>
                  {c.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: T.primaryDark, marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 12, color: T.textLight, marginBottom: 14 }}>{c.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: T.primary }}>
                  Login <ArrowForwardIcon sx={{ fontSize: 14 }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '88px 24px', background: T.primaryDark, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 30, left: 60, width: 240, height: 240, background: 'rgba(201,162,39,0.1)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 30, right: 60, width: 280, height: 280, background: 'rgba(201,162,39,0.08)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: T.primary, marginBottom: 14 }}>Ready to transform your campus?</h2>
          <p style={{ color: 'rgba(250,243,224,0.7)', fontSize: 16, marginBottom: 36 }}>Join thousands of students and faculty already using CampusHub.</p>
          <button
            onClick={() => navigate('/login')}
            style={{ background: T.primary, color: T.primaryDark, border: 'none', borderRadius: 12, padding: '14px 38px', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: `0 6px 24px ${T.gold40}`, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = T.primary; e.currentTarget.style.color = T.primaryDark; e.currentTarget.style.transform = 'none'; }}
          >
            Get Started Now <ArrowForwardIcon sx={{ fontSize: 19 }} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: T.bgAlt, borderTop: `1px solid ${T.border}`, padding: '36px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SchoolIcon sx={{ fontSize: 14, color: T.primaryDark }} />
            </div>
            <span style={{ fontWeight: 700, color: T.primaryDark }}>CampusHub</span>
          </div>
          <p style={{ fontSize: 13, color: T.textLight, margin: 0 }}>© 2025 CampusHub. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: T.textLight, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = T.primary}
                onMouseOut={e => e.currentTarget.style.color = T.textLight}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
