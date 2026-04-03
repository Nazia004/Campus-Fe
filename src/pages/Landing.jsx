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

const FEATURES = [
  { icon: <SchoolIcon sx={{ fontSize: 32 }} />, title: 'Student Portal', desc: 'Access academic records, attendance, timetables and announcements all in one place.', accent: 'rgba(59,130,246,0.2)', iconColor: '#93C5FD' },
  { icon: <GroupsIcon sx={{ fontSize: 32 }} />, title: 'Club Management', desc: 'Discover, join and manage college clubs. Post events and connect with members.', accent: 'rgba(124,58,237,0.2)', iconColor: '#C4B5FD' },
  { icon: <WorkIcon sx={{ fontSize: 32 }} />, title: 'Placement Cell', desc: 'Browse job listings, apply for internships and track your placement journey.', accent: 'rgba(16,185,129,0.2)', iconColor: '#6EE7B7' },
  { icon: <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />, title: 'Admin Control', desc: 'Manage users, monitor activity and configure the entire campus platform.', accent: 'rgba(249,115,22,0.2)', iconColor: '#FCA5A5' },
];

const STATS = [
  { value: '5,000+', label: 'Students Enrolled' },
  { value: '120+', label: 'Active Clubs' },
  { value: '300+', label: 'Placements This Year' },
  { value: '98%', label: 'Satisfaction Rate' },
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
  { role: 'student', label: 'Student', icon: <SchoolIcon />, accent: 'rgba(59,130,246,0.25)', border: 'rgba(59,130,246,0.4)', desc: 'Access your academic portal' },
  { role: 'club', label: 'Club', icon: <GroupsIcon />, accent: 'rgba(124,58,237,0.25)', border: 'rgba(124,58,237,0.4)', desc: 'Manage your club activities' },
  { role: 'placement', label: 'Placement', icon: <WorkIcon />, accent: 'rgba(16,185,129,0.25)', border: 'rgba(16,185,129,0.4)', desc: 'Placement cell dashboard' },
  { role: 'admin', label: 'Admin', icon: <AdminPanelSettingsIcon />, accent: 'rgba(249,115,22,0.25)', border: 'rgba(249,115,22,0.4)', desc: 'Full platform control' },
];

const glass = { background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16 };

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#4C1D95 100%)', backgroundAttachment: 'fixed' }}>

      {/* ── Navbar ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SchoolIcon sx={{ fontSize: 18, color: 'white' }} />
          </div>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#F8FAFC' }}>CampusHub</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(124,58,237,0.4)', transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.filter = 'brightness(1.15)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
        >
          Sign In
        </button>
      </nav>

      {/* ── Hero ── */}
      <section style={{ paddingTop: 128, paddingBottom: 96, paddingLeft: 24, paddingRight: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 80, right: 0, width: 400, height: 400, background: 'rgba(124,58,237,0.15)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 40, width: 300, height: 300, background: 'rgba(59,130,246,0.1)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#C4B5FD', fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 20, marginBottom: 24 }}>
            🎓 All-in-one Campus Platform
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 800, color: '#F8FAFC', lineHeight: 1.15, marginBottom: 24 }}>
            Your Campus,{' '}
            <span style={{ background: 'linear-gradient(135deg,#A78BFA,#60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Reimagined
            </span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(203,213,225,0.8)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}>
            CampusHub brings students, clubs, placement cell and administration together on a single unified platform — streamlining every aspect of college life.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/login')}
              style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 24px rgba(124,58,237,0.45)', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
            >
              Get Started Free <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </button>
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'rgba(255,255,255,0.07)', color: '#CBD5E1', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#F8FAFC'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#CBD5E1'; }}
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* Hero visual */}
        <div style={{ maxWidth: 900, margin: '64px auto 0', position: 'relative', zIndex: 1 }}>
          <div style={{ ...glass, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
              <div style={{ flex: 1, marginLeft: 16, background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '4px 12px', fontSize: 11, color: 'rgba(203,213,225,0.5)' }}>campushub.edu.in/dashboard</div>
            </div>
            <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {[
                { label: 'Total Students', value: '5,248', icon: <SchoolIcon sx={{ fontSize: 20 }} />, accent: 'rgba(59,130,246,0.2)', color: '#93C5FD' },
                { label: 'Active Clubs', value: '124', icon: <GroupsIcon sx={{ fontSize: 20 }} />, accent: 'rgba(124,58,237,0.2)', color: '#C4B5FD' },
                { label: 'Job Listings', value: '89', icon: <WorkIcon sx={{ fontSize: 20 }} />, accent: 'rgba(16,185,129,0.2)', color: '#6EE7B7' },
                { label: 'Notifications', value: '12 New', icon: <NotificationsActiveIcon sx={{ fontSize: 20 }} />, accent: 'rgba(249,115,22,0.2)', color: '#FCA5A5' },
              ].map((card) => (
                <div key={card.label} style={{ background: card.accent, border: `1px solid ${card.color}30`, borderRadius: 12, padding: 16 }}>
                  <div style={{ color: card.color, marginBottom: 8, opacity: 0.9 }}>{card.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC' }}>{card.value}</div>
                  <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.6)', marginTop: 4 }}>{card.label}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '0 24px 24px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {[
                { title: 'Upcoming: Tech Fest 2025', tag: 'Event', tagColor: 'rgba(124,58,237,0.2)', tagText: '#C4B5FD' },
                { title: 'TCS Campus Drive — Apply Now', tag: 'Placement', tagColor: 'rgba(16,185,129,0.2)', tagText: '#6EE7B7' },
                { title: 'Semester Results Published', tag: 'Academic', tagColor: 'rgba(59,130,246,0.2)', tagText: '#93C5FD' },
              ].map((item) => (
                <div key={item.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: item.tagColor, color: item.tagText }}>{item.tag}</span>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#CBD5E1', marginTop: 10, marginBottom: 0 }}>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '64px 24px', background: 'rgba(124,58,237,0.15)', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, textAlign: 'center' }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#F8FAFC', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'rgba(203,213,225,0.7)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ display: 'inline-block', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#C4B5FD', fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>Features</span>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#F8FAFC', marginBottom: 12 }}>Everything your campus needs</h2>
            <p style={{ color: 'rgba(203,213,225,0.7)', maxWidth: 500, margin: '0 auto' }}>Four powerful portals, one seamless experience for every stakeholder.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ ...glass, padding: 32, cursor: 'default', transition: 'all 0.25s' }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.11)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(124,58,237,0.2)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 16, background: f.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: f.iconColor }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: 'rgba(203,213,225,0.7)', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section style={{ padding: '96px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-block', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#C4B5FD', fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>Why CampusHub</span>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#F8FAFC', marginBottom: 16, lineHeight: 1.2 }}>Built for modern campus life</h2>
            <p style={{ color: 'rgba(203,213,225,0.7)', marginBottom: 32, lineHeight: 1.7 }}>
              Designed from the ground up to handle the complexity of a modern educational institution — with security, speed and simplicity at its core.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {HIGHLIGHTS.map((h) => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckCircleIcon sx={{ color: '#A78BFA', fontSize: 20 }} />
                  <span style={{ color: '#CBD5E1', fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: <InsightsIcon sx={{ fontSize: 28 }} />, title: 'Analytics', desc: 'Track performance metrics across all departments', accent: 'rgba(124,58,237,0.2)', color: '#C4B5FD' },
              { icon: <SecurityIcon sx={{ fontSize: 28 }} />, title: 'Secure', desc: 'Role-based access with JWT authentication', accent: 'rgba(59,130,246,0.2)', color: '#93C5FD' },
              { icon: <NotificationsActiveIcon sx={{ fontSize: 28 }} />, title: 'Real-time', desc: 'Instant notifications for events and updates', accent: 'rgba(16,185,129,0.2)', color: '#6EE7B7' },
              { icon: <EmojiEventsIcon sx={{ fontSize: 28 }} />, title: 'Achievements', desc: 'Celebrate student and club milestones', accent: 'rgba(249,115,22,0.2)', color: '#FCA5A5' },
            ].map((card) => (
              <div key={card.title} style={{ ...glass, padding: 24, transition: 'all 0.25s' }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.11)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: card.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: card.color }}>
                  {card.icon}
                </div>
                <h4 style={{ fontWeight: 700, color: '#F8FAFC', marginBottom: 6, fontSize: 15 }}>{card.title}</h4>
                <p style={{ fontSize: 12, color: 'rgba(203,213,225,0.6)', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Login Cards ── */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#C4B5FD', fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>Get Started</span>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#F8FAFC', marginBottom: 12 }}>Choose your portal</h2>
            <p style={{ color: 'rgba(203,213,225,0.7)' }}>Select your role to access your personalized dashboard.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {LOGIN_CARDS.map((card) => (
              <button
                key={card.role}
                onClick={() => navigate('/login', { state: { role: card.role } })}
                style={{ background: card.accent, border: `1px solid ${card.border}`, borderRadius: 16, padding: 24, textAlign: 'left', cursor: 'pointer', transition: 'all 0.25s', backdropFilter: 'blur(12px)' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 16px 40px ${card.border}50`; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.12)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#F8FAFC' }}>
                  {card.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#F8FAFC', marginBottom: 4 }}>{card.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(203,213,225,0.7)', marginBottom: 16 }}>{card.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#C4B5FD' }}>
                  Login <ArrowForwardIcon sx={{ fontSize: 15 }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden', background: 'rgba(124,58,237,0.12)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ position: 'absolute', top: 40, left: 80, width: 256, height: 256, background: 'rgba(124,58,237,0.15)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 40, right: 80, width: 320, height: 320, background: 'rgba(59,130,246,0.1)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#F8FAFC', marginBottom: 16 }}>Ready to transform your campus?</h2>
          <p style={{ color: 'rgba(203,213,225,0.7)', fontSize: 17, marginBottom: 40 }}>Join thousands of students and faculty already using CampusHub.</p>
          <button
            onClick={() => navigate('/login')}
            style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', color: '#fff', border: 'none', borderRadius: 12, padding: '16px 40px', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 32px rgba(124,58,237,0.45)', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
          >
            Get Started Now <ArrowForwardIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: 'rgba(15,23,42,0.9)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SchoolIcon sx={{ fontSize: 14, color: 'white' }} />
            </div>
            <span style={{ fontWeight: 700, color: '#F8FAFC' }}>CampusHub</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(203,213,225,0.5)', margin: 0 }}>© 2025 CampusHub. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(203,213,225,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = '#F8FAFC'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(203,213,225,0.5)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
