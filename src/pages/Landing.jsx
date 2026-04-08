import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import EclipseFollower from '../components/effects/EclipseFollower';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VerifiedIcon from '@mui/icons-material/Verified';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import ForumIcon from '@mui/icons-material/Forum';
import HubIcon from '@mui/icons-material/Hub';
import SpeedIcon from '@mui/icons-material/Speed';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CampaignIcon from '@mui/icons-material/Campaign';
import ScaleIcon from '@mui/icons-material/Scale';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

// ── Theme Tokens ──
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
  gold15:      'rgba(201,162,39,0.15)',
  gold20:      'rgba(201,162,39,0.20)',
  gold30:      'rgba(201,162,39,0.30)',
  gold40:      'rgba(201,162,39,0.40)',
  brownDark:   '#2A1B17',
  problemRed:  '#B4503C',
};

// ── Keyframe animations (embedded) ──
const KEYFRAMES = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201,162,39,0.4); }
  50%      { box-shadow: 0 0 0 12px rgba(201,162,39,0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}
@keyframes shimmer {
  0%   { left: -100%; }
  100% { left: 100%; }
}
`;

// ── Data ──
const STATS = [
  { value: '5,000+', label: 'Active Students' },
  { value: '120+',   label: 'Clubs Managed' },
  { value: '92%',    label: 'Placement Success Rate' },
  { value: '10K+',   label: 'Monthly Interactions' },
];

const PROBLEMS = [
  { icon: <LinkOffIcon />,          title: 'Disconnected Systems',   desc: 'Academics, clubs, and placements live in separate tools — nothing talks to each other.' },
  { icon: <NotificationsOffIcon />, title: 'Missed Updates',         desc: 'Important deadlines and announcements slip through cracks across scattered channels.' },
  { icon: <ForumIcon />,            title: 'Poor Communication',     desc: 'No central place for students, faculty, and admin to coordinate effectively.' },
];

const SOLUTIONS = [
  { icon: <HubIcon />,        title: 'Unified Platform',        desc: 'One system for academics, clubs, placements, and campus events — fully integrated.' },
  { icon: <SpeedIcon />,      title: 'Real-Time Notifications', desc: 'Never miss a deadline, event, or placement opportunity with instant push alerts.' },
  { icon: <DashboardIcon />,  title: 'Role-Based Dashboards',   desc: 'Students, club leads, placement cells, and admins each get a tailored experience.' },
];

const FEATURES = [
  { icon: <SchoolIcon sx={{ fontSize: 30 }} />,              title: 'Academic Control',   desc: 'Track attendance, grades, timetables, and assignments in one unified view.' },
  { icon: <WorkIcon sx={{ fontSize: 30 }} />,                title: 'Placement Engine',   desc: 'Browse internships, jobs, and campus drives. Apply and track status instantly.' },
  { icon: <GroupsIcon sx={{ fontSize: 30 }} />,              title: 'Club Ecosystem',     desc: 'Discover clubs, manage members, organize events, and grow your community.' },
  { icon: <NotificationsActiveIcon sx={{ fontSize: 30 }} />, title: 'Smart Notifications',desc: 'Context-aware alerts for events, deadlines, and placement updates.' },
];

const FLOW_STEPS = [
  { icon: <LoginIcon sx={{ fontSize: 28 }} />,          label: 'Login',            desc: 'Secure role-based login for every user' },
  { icon: <AssignmentIcon sx={{ fontSize: 28 }} />,     label: 'Check Assignments', desc: 'View your pending work at a glance' },
  { icon: <EventIcon sx={{ fontSize: 28 }} />,          label: 'Join Event',       desc: 'Discover and register for campus events' },
  { icon: <BusinessCenterIcon sx={{ fontSize: 28 }} />, label: 'Apply Internship', desc: 'Find and apply to opportunities' },
];

const WHY_ITEMS = [
  { icon: <IntegrationInstructionsIcon />, title: 'All-in-One System',      desc: 'No more juggling five different platforms. Everything lives here.' },
  { icon: <CampaignIcon />,               title: 'Built for Real Colleges', desc: 'Designed with actual college workflows, not generic templates.' },
  { icon: <ScaleIcon />,                  title: 'Scales With You',         desc: 'From 500 to 50,000 students — the architecture handles it all.' },
];

const WHY_METRICS = [
  { label: 'User Satisfaction', value: '98%',  width: '98%' },
  { label: 'Response Time',     value: '<1s',  width: '95%' },
  { label: 'Uptime',            value: '99.9%',width: '99%' },
  { label: 'Feature Coverage',  value: '100%', width: '100%' },
];

// ── Hover helper ──
function HoverDiv({ style, hoverStyle, children, ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
}

function HoverButton({ style, hoverStyle, children, ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
}

function HoverLink({ style, hoverStyle, children, ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      style={{ ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </a>
  );
}

// ── Scroll reveal hook ──
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Shared styles ──
const badge = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  background: T.gold15, border: `1px solid ${T.gold30}`,
  color: T.accent, fontSize: 12, fontWeight: 700,
  padding: '5px 16px', borderRadius: 50,
  marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5,
};
const sectionTitle = {
  fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 800,
  color: T.primaryDark, margin: '0 0 12px', letterSpacing: -0.5,
};
const sectionSub = {
  fontSize: 16, color: T.textLight, maxWidth: 500, margin: '0 auto',
};
const card = {
  background: T.bgCard, border: `1px solid ${T.border}`,
  borderRadius: 18, transition: 'all 0.3s ease', cursor: 'default',
};
const cardHover = {
  transform: 'translateY(-6px)',
  boxShadow: `0 14px 44px rgba(201,162,39,0.15)`,
  borderColor: T.gold30,
};

// ══════════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════════
export default function Landing() {
  const navigate = useNavigate();
  const statsRef    = useScrollReveal();
  const problemRef  = useScrollReveal();
  const featuresRef = useScrollReveal();
  const flowRef     = useScrollReveal();
  const whyRef      = useScrollReveal();
  const ctaRef      = useScrollReveal();

  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      <EclipseFollower />
      {/* Inject keyframes */}
      <style>{KEYFRAMES}</style>

      {/* ━━ NAVBAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(250,243,224,0.88)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)', borderBottom: `1px solid ${T.border}`,
        height: 68, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 clamp(20px,4vw,48px)',
        boxShadow: '0 1px 12px rgba(62,39,35,0.06)',
        animation: 'fadeInDown 0.6s ease-out',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 3px 12px ${T.gold40}`,
          }}>
            <SchoolIcon sx={{ fontSize: 18, color: T.primaryDark }} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: T.primaryDark, letterSpacing: -0.3 }}>CampusHub</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {[
            { label: 'Features', href: '#features' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Why Us', href: '#why' },
          ].map(l => (
            <HoverLink key={l.label} href={l.href}
              style={{ fontSize: 13.5, fontWeight: 600, color: T.textLight, textDecoration: 'none', transition: 'color 0.2s' }}
              hoverStyle={{ color: T.primaryDark }}
            >{l.label}</HoverLink>
          ))}
        </div>

        <HoverButton
          onClick={() => navigate('/login')}
          style={{
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
            color: T.primaryDark, border: 'none', borderRadius: 10,
            padding: '9px 24px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
            boxShadow: `0 3px 14px ${T.gold40}`, transition: 'all 0.25s',
          }}
          hoverStyle={{ transform: 'translateY(-2px)', boxShadow: `0 6px 24px ${T.gold40}`, color: '#FFF' }}
        >Sign In</HoverButton>
      </nav>

      {/* ━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{
        paddingTop: 140, paddingBottom: 80, paddingLeft: 24, paddingRight: 24,
        background: `linear-gradient(170deg, ${T.bg} 0%, ${T.bgAlt} 50%, ${T.sidebar} 100%)`,
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        {/* Orbs */}
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: T.gold10, top: -60, right: -80, filter: 'blur(80px)', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: T.gold10, bottom: -60, left: -40, filter: 'blur(80px)', pointerEvents: 'none', animation: 'float 10s ease-in-out infinite 2s' }} />

        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: T.gold15, border: `1px solid ${T.gold30}`,
            color: T.accent, fontSize: 13, fontWeight: 600,
            padding: '6px 18px', borderRadius: 50, marginBottom: 28,
            animation: 'scaleIn 0.6s ease-out 0.2s both',
          }}>
            <span style={{ width: 7, height: 7, background: T.primary, borderRadius: '50%', animation: 'pulseGlow 2s ease-in-out infinite' }} />
            All-in-one Campus Platform
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem,5.5vw,3.8rem)', fontWeight: 900,
            color: T.primaryDark, lineHeight: 1.1, margin: '0 0 22px',
            letterSpacing: -1, animation: 'fadeInUp 0.7s ease-out 0.3s both',
          }}>
            One Platform to Run Your{' '}
            <span style={{
              background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Entire Campus</span>
          </h1>

          <p style={{
            fontSize: 18, color: T.textLight, maxWidth: 600,
            margin: '0 auto 40px', lineHeight: 1.7,
            animation: 'fadeInUp 0.7s ease-out 0.45s both',
          }}>
            CampusHub integrates academics, clubs, placements, and campus events
            into a single intelligent platform — so nothing falls through the cracks.
          </p>

          <div style={{
            display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap',
            animation: 'fadeInUp 0.7s ease-out 0.6s both',
          }}>
            <HoverButton
              onClick={() => navigate('/login')}
              style={{
                background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
                color: T.primaryDark, border: 'none', borderRadius: 14,
                padding: '15px 36px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: `0 6px 28px ${T.gold40}`, transition: 'all 0.3s',
                position: 'relative', overflow: 'hidden',
              }}
              hoverStyle={{ transform: 'translateY(-3px)', boxShadow: `0 10px 40px rgba(201,162,39,0.5)`, color: '#FFF' }}
            >
              Get Started <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </HoverButton>
            <HoverButton
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent', color: T.textMain,
                border: `2px solid ${T.border}`, borderRadius: 14,
                padding: '14px 32px', fontSize: 16, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.3s',
              }}
              hoverStyle={{ borderColor: T.primary, color: T.primary, transform: 'translateY(-2px)' }}
            >
              Explore Features
            </HoverButton>
          </div>

          {/* Proof Points */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 48,
            marginTop: 56, animation: 'fadeInUp 0.7s ease-out 0.8s both',
            flexWrap: 'wrap',
          }}>
            {[
              { value: '5,000+', label: 'Students' },
              { value: '100+', label: 'Clubs' },
              { value: 'Real-time', label: 'Placement Tracking' },
            ].map(p => (
              <div key={p.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: T.primaryDark, marginBottom: 4 }}>{p.value}</div>
                <div style={{ fontSize: 13, color: T.textLight, fontWeight: 500 }}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ STATS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={statsRef} style={{
        padding: '64px 24px',
        background: `linear-gradient(135deg, ${T.primaryDark}, ${T.brownDark})`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(201,162,39,0.1)', top: -80, left: '10%', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%', background: 'rgba(201,162,39,0.07)', bottom: -60, right: '15%', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32,
          textAlign: 'center', position: 'relative', zIndex: 1,
        }}>
          {STATS.map(s => (
            <HoverDiv key={s.label}
              style={{
                padding: '20px 12px', borderRadius: 16,
                background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.12)',
                transition: 'all 0.3s',
              }}
              hoverStyle={{ background: 'rgba(201,162,39,0.1)', borderColor: 'rgba(201,162,39,0.25)', transform: 'translateY(-4px)' }}
            >
              <div style={{ fontSize: 36, fontWeight: 900, color: T.primary, marginBottom: 6, letterSpacing: -1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'rgba(250,243,224,0.6)', fontWeight: 500 }}>{s.label}</div>
            </HoverDiv>
          ))}
        </div>
      </section>

      {/* ━━ PROBLEM → SOLUTION ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={problemRef} style={{ padding: '100px 24px', background: T.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={badge}><AutoAwesomeIcon sx={{ fontSize: 14 }} /> The Problem We Solve</div>
            <h2 style={sectionTitle}>From Chaos to Clarity</h2>
            <p style={sectionSub}>Most campuses run on disconnected tools. CampusHub changes that.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'start' }}>
            {/* Problem Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{
                fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
                padding: '6px 16px', borderRadius: 8, textAlign: 'center', marginBottom: 8,
                color: T.problemRed, background: 'rgba(180,80,60,0.08)',
              }}>❌ The Problem</div>
              {PROBLEMS.map(p => (
                <HoverDiv key={p.title}
                  style={{
                    padding: 24, borderRadius: 16, background: '#FFF',
                    border: '1px solid rgba(180,80,60,0.15)', transition: 'all 0.3s',
                  }}
                  hoverStyle={{ transform: 'translateY(-4px)', borderColor: 'rgba(180,80,60,0.3)', boxShadow: '0 8px 30px rgba(180,80,60,0.08)' }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, marginBottom: 14,
                    background: 'rgba(180,80,60,0.1)', color: T.problemRed,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{p.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.primaryDark, marginBottom: 6 }}>{p.title}</div>
                  <p style={{ fontSize: 14, color: T.textLight, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </HoverDiv>
              ))}
            </div>

            {/* Divider Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 40 }}>
              <div style={{ width: 2, height: 60, background: `linear-gradient(to bottom, transparent, ${T.border}, transparent)` }} />
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: T.primaryDark, boxShadow: `0 4px 20px ${T.gold30}`,
                fontSize: 22, fontWeight: 800,
              }}>→</div>
              <div style={{ width: 2, height: 60, background: `linear-gradient(to bottom, transparent, ${T.border}, transparent)` }} />
            </div>

            {/* Solution Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{
                fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
                padding: '6px 16px', borderRadius: 8, textAlign: 'center', marginBottom: 8,
                color: T.accent, background: T.gold10,
              }}>✓ The Solution</div>
              {SOLUTIONS.map(s => (
                <HoverDiv key={s.title}
                  style={{
                    padding: 24, borderRadius: 16, background: '#FFF',
                    border: `1px solid ${T.gold20}`, transition: 'all 0.3s',
                  }}
                  hoverStyle={{ transform: 'translateY(-4px)', borderColor: T.gold40, boxShadow: `0 8px 30px rgba(201,162,39,0.12)` }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, marginBottom: 14,
                    background: T.gold15, color: T.primary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{s.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.primaryDark, marginBottom: 6 }}>{s.title}</div>
                  <p style={{ fontSize: 14, color: T.textLight, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </HoverDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ FEATURES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={featuresRef} id="features" style={{ padding: '100px 24px', background: T.bgAlt }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={badge}><RocketLaunchIcon sx={{ fontSize: 14 }} /> Core Features</div>
            <h2 style={sectionTitle}>Everything Your Campus Needs</h2>
            <p style={sectionSub}>Four powerful modules, one seamless experience — built for students, clubs, placement cells, and admins.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
            {FEATURES.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━ USE CASE FLOW ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={flowRef} id="how-it-works" style={{ padding: '100px 24px', background: T.bg }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={badge}><TrendingUpIcon sx={{ fontSize: 14 }} /> Student Journey</div>
            <h2 style={sectionTitle}>How It Works</h2>
            <p style={sectionSub}>From login to application — everything a student needs, in four simple steps.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
            {/* Connector line */}
            <div style={{
              position: 'absolute', top: 36, left: 60, right: 60, height: 3,
              background: `linear-gradient(90deg, ${T.border} 0%, ${T.primary} 50%, ${T.border} 100%)`,
              borderRadius: 3, zIndex: 0,
            }} />
            {FLOW_STEPS.map((step, i) => (
              <FlowStep key={step.label} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━ WHY CAMPUSHUB ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={whyRef} id="why" style={{ padding: '100px 24px', background: T.bgAlt }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          {/* Left: Content */}
          <div>
            <div style={badge}><VerifiedIcon sx={{ fontSize: 14 }} /> Why CampusHub</div>
            <h2 style={{ ...sectionTitle, lineHeight: 1.2 }}>Built Different. Built Better.</h2>
            <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, margin: '0 0 32px' }}>
              CampusHub isn't another generic portal. It's purpose-built for
              real campus workflows — designed to scale, integrate, and delight.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {WHY_ITEMS.map(item => (
                <HoverDiv key={item.title}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    padding: '16px 20px', background: '#FFF', borderRadius: 14,
                    border: `1px solid ${T.border}`, transition: 'all 0.3s',
                  }}
                  hoverStyle={{ borderColor: T.gold30, boxShadow: `0 6px 24px rgba(201,162,39,0.1)`, transform: 'translateX(6px)' }}
                >
                  <div style={{
                    width: 40, height: 40, minWidth: 40, borderRadius: 10,
                    background: T.gold10, color: T.primary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: T.primaryDark, margin: '0 0 4px' }}>{item.title}</h4>
                    <p style={{ fontSize: 13, color: T.textLight, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                  </div>
                </HoverDiv>
              ))}
            </div>
          </div>

          {/* Right: Visual Metrics Card */}
          <div>
            <div style={{
              background: '#FFF', border: `1px solid ${T.border}`, borderRadius: 20,
              padding: 32, boxShadow: '0 8px 40px rgba(62,39,35,0.08)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: `linear-gradient(90deg, ${T.primary}, ${T.accent}, ${T.primary})`,
              }} />
              {WHY_METRICS.map(m => (
                <div key={m.label} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 0', borderBottom: `1px solid #F0E8D5`,
                }}>
                  <span style={{ fontSize: 14, color: T.textLight, fontWeight: 500 }}>{m.label}</span>
                  <div style={{ flex: 1, maxWidth: 180, height: 8, background: '#F0E8D5', borderRadius: 8, margin: '0 16px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`,
                      width: m.width, transition: 'width 1.5s ease-out',
                    }} />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: T.primaryDark, minWidth: 44, textAlign: 'right' }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ FINAL CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={ctaRef} style={{
        padding: '100px 24px',
        background: `linear-gradient(135deg, ${T.primaryDark}, ${T.brownDark})`,
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', background: 'rgba(201,162,39,0.1)', top: -100, left: -80, filter: 'blur(100px)', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(201,162,39,0.07)', bottom: -80, right: -60, filter: 'blur(100px)', pointerEvents: 'none', animation: 'float 10s ease-in-out infinite 3s' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900,
            color: T.primary, margin: '0 0 16px', letterSpacing: -0.5, lineHeight: 1.15,
          }}>
            Bring Your Entire Campus Online — Today
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(250,243,224,0.6)', margin: '0 0 44px', lineHeight: 1.6 }}>
            Join thousands of students, faculty, and administrators already
            using CampusHub to streamline campus life.
          </p>
          <HoverButton
            onClick={() => navigate('/login')}
            style={{
              background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
              color: T.primaryDark, border: 'none', borderRadius: 14,
              padding: '16px 44px', fontSize: 17, fontWeight: 700, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: `0 6px 32px ${T.gold40}`, transition: 'all 0.3s',
              animation: 'pulseGlow 3s ease-in-out infinite',
            }}
            hoverStyle={{ transform: 'translateY(-3px) scale(1.02)', boxShadow: '0 10px 44px rgba(201,162,39,0.55)', color: '#FFF' }}
          >
            Get Started Now <ArrowForwardIcon sx={{ fontSize: 20 }} />
          </HoverButton>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 56, flexWrap: 'wrap' }}>
            {[
              { icon: <SecurityIcon sx={{ fontSize: 18, color: 'rgba(201,162,39,0.6)' }} />, text: 'End-to-end Secure' },
              { icon: <SupportAgentIcon sx={{ fontSize: 18, color: 'rgba(201,162,39,0.6)' }} />, text: 'Always-on Support' },
              { icon: <VerifiedIcon sx={{ fontSize: 18, color: 'rgba(201,162,39,0.6)' }} />, text: 'Trusted by 50+ Colleges' },
            ].map(t => (
              <div key={t.text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(250,243,224,0.45)', fontSize: 13, fontWeight: 500 }}>
                {t.icon}
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer style={{ background: T.brownDark, borderTop: '1px solid rgba(201,162,39,0.12)', padding: '36px 24px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <SchoolIcon sx={{ fontSize: 15, color: T.primaryDark }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: 'rgba(250,243,224,0.8)' }}>CampusHub</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(250,243,224,0.35)', margin: 0 }}>© 2025 CampusHub. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <HoverLink key={l} href="#"
                style={{ fontSize: 13, color: 'rgba(250,243,224,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                hoverStyle={{ color: T.primary }}
              >{l}</HoverLink>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Feature Card sub-component ──
function FeatureCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFF', border: `1px solid ${T.border}`, borderRadius: 18,
        padding: '32px 24px', textAlign: 'center', cursor: 'default',
        transition: 'all 0.35s', position: 'relative', overflow: 'hidden',
        ...(hovered ? {
          transform: 'translateY(-8px)',
          boxShadow: '0 16px 48px rgba(201,162,39,0.15)',
          borderColor: T.gold30,
        } : {}),
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${T.primary}, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
      }} />
      <div style={{
        width: 64, height: 64, borderRadius: 16, margin: '0 auto 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s',
        ...(hovered
          ? { background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#FFF', transform: 'scale(1.08)', boxShadow: `0 4px 16px ${T.gold30}` }
          : { background: T.gold10, color: T.primary }),
      }}>{icon}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: T.primaryDark, marginBottom: 8 }}>{title}</div>
      <p style={{ fontSize: 14, color: T.textLight, lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ── Flow Step sub-component ──
function FlowStep({ icon, label, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', flex: 1, position: 'relative', zIndex: 1,
      }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 18, transition: 'all 0.35s',
        ...(hovered
          ? { background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, borderColor: T.primary, color: '#FFF', border: `3px solid ${T.primary}`, transform: 'scale(1.12)', boxShadow: `0 6px 24px ${T.gold40}` }
          : { background: '#FFF', border: `3px solid ${T.border}`, color: T.primary }),
      }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: T.primaryDark, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 13, color: T.textLight, maxWidth: 140, lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}
