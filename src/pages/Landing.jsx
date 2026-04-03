import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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
import './Landing.css';

// ── Intersection Observer hook for scroll-triggered animations ──
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Data ─────────────────────────────────────────────────────────
const STATS = [
  { value: '5,000+', label: 'Active Students' },
  { value: '120+',   label: 'Clubs Managed' },
  { value: '92%',    label: 'Placement Success Rate' },
  { value: '10K+',   label: 'Monthly Interactions' },
];

const PROBLEMS = [
  { icon: <LinkOffIcon />,             title: 'Disconnected Systems',   desc: 'Academics, clubs, and placements live in separate tools — nothing talks to each other.' },
  { icon: <NotificationsOffIcon />,    title: 'Missed Updates',         desc: 'Important deadlines and announcements slip through cracks across scattered channels.' },
  { icon: <ForumIcon />,               title: 'Poor Communication',     desc: 'No central place for students, faculty, and admin to coordinate effectively.' },
];

const SOLUTIONS = [
  { icon: <HubIcon />,                 title: 'Unified Platform',       desc: 'One system for academics, clubs, placements, and campus events — fully integrated.' },
  { icon: <SpeedIcon />,               title: 'Real-Time Notifications', desc: 'Never miss a deadline, event, or placement opportunity with instant push alerts.' },
  { icon: <DashboardIcon />,           title: 'Role-Based Dashboards',  desc: 'Students, club leads, placement cells, and admins each get a tailored experience.' },
];

const FEATURES = [
  { icon: <SchoolIcon sx={{ fontSize: 30 }} />,               title: 'Academic Control',       desc: 'Track attendance, grades, timetables, and assignments in one unified view.' },
  { icon: <WorkIcon sx={{ fontSize: 30 }} />,                 title: 'Placement Engine',       desc: 'Browse internships, jobs, and campus drives. Apply and track status instantly.' },
  { icon: <GroupsIcon sx={{ fontSize: 30 }} />,               title: 'Club Ecosystem',         desc: 'Discover clubs, manage members, organize events, and grow your community.' },
  { icon: <NotificationsActiveIcon sx={{ fontSize: 30 }} />,  title: 'Smart Notifications',    desc: 'Context-aware alerts for events, deadlines, and placement updates.' },
];

const FLOW_STEPS = [
  { icon: <LoginIcon sx={{ fontSize: 28 }} />,          label: 'Login',             desc: 'Secure role-based login for every user' },
  { icon: <AssignmentIcon sx={{ fontSize: 28 }} />,     label: 'Check Assignments',  desc: 'View your pending work at a glance' },
  { icon: <EventIcon sx={{ fontSize: 28 }} />,          label: 'Join Event',         desc: 'Discover and register for campus events' },
  { icon: <BusinessCenterIcon sx={{ fontSize: 28 }} />, label: 'Apply Internship',   desc: 'Find and apply to opportunities' },
];

const WHY_ITEMS = [
  { icon: <IntegrationInstructionsIcon />, title: 'All-in-One System',      desc: 'No more juggling five different platforms. Everything lives here.' },
  { icon: <CampaignIcon />,               title: 'Built for Real Colleges', desc: 'Designed with actual college workflows, not generic templates.' },
  { icon: <ScaleIcon />,                  title: 'Scales With You',         desc: 'From 500 to 50,000 students — the architecture handles it all.' },
];

const WHY_METRICS = [
  { label: 'User Satisfaction', value: '98%', width: '98%' },
  { label: 'Response Time',    value: '<1s',  width: '95%' },
  { label: 'Uptime',           value: '99.9%',width: '99%' },
  { label: 'Feature Coverage',  value: '100%', width: '100%' },
];

// ── Component ────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate();
  const statsRef    = useScrollReveal();
  const problemRef  = useScrollReveal();
  const featuresRef = useScrollReveal();
  const flowRef     = useScrollReveal();
  const whyRef      = useScrollReveal();
  const ctaRef      = useScrollReveal();

  return (
    <div className="landing-root">

      {/* ━━ Navbar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <nav className="landing-nav" id="landing-navbar">
        <div className="landing-nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
          <div className="landing-nav__logo-icon">
            <SchoolIcon sx={{ fontSize: 18, color: '#3E2723' }} />
          </div>
          <span className="landing-nav__logo-text">CampusHub</span>
        </div>
        <div className="landing-nav__links">
          <a href="#features" className="landing-nav__link">Features</a>
          <a href="#how-it-works" className="landing-nav__link">How It Works</a>
          <a href="#why" className="landing-nav__link">Why Us</a>
        </div>
        <button
          className="landing-nav__cta"
          onClick={() => navigate('/login')}
          id="nav-sign-in"
        >
          Sign In
        </button>
      </nav>

      {/* ━━ Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="hero" id="hero-section">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />

        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            All-in-one Campus Platform
          </div>

          <h1 className="hero__title">
            One Platform to Run Your{' '}
            <span className="hero__title-highlight">Entire Campus</span>
          </h1>

          <p className="hero__subtitle">
            CampusHub integrates academics, clubs, placements, and campus events
            into a single intelligent platform — so nothing falls through the cracks.
          </p>

          <div className="hero__actions">
            <button
              className="hero__btn-primary"
              onClick={() => navigate('/login')}
              id="hero-get-started"
            >
              Get Started <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </button>
            <button
              className="hero__btn-secondary"
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              id="hero-explore"
            >
              Explore Features
            </button>
          </div>

          <div className="hero__proof">
            <div className="hero__proof-item">
              <div className="hero__proof-value">5,000+</div>
              <div className="hero__proof-label">Students</div>
            </div>
            <div className="hero__proof-item">
              <div className="hero__proof-value">100+</div>
              <div className="hero__proof-label">Clubs</div>
            </div>
            <div className="hero__proof-item">
              <div className="hero__proof-value">Real-time</div>
              <div className="hero__proof-label">Placement Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ Stats ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="stats" ref={statsRef} id="stats-section">
        <div className="stats__orb stats__orb--1" />
        <div className="stats__orb stats__orb--2" />
        <div className="stats__grid">
          {STATS.map((s) => (
            <div className="stats__item" key={s.label}>
              <div className="stats__value">{s.value}</div>
              <div className="stats__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━ Problem → Solution ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="problem-solution" ref={problemRef} id="problem-solution-section">
        <div className="problem-solution__inner">
          <div className="problem-solution__header">
            <div className="problem-solution__badge">
              <AutoAwesomeIcon sx={{ fontSize: 14 }} /> The Problem We Solve
            </div>
            <h2 className="problem-solution__title">From Chaos to Clarity</h2>
            <p className="problem-solution__subtitle">
              Most campuses run on disconnected tools. CampusHub changes that.
            </p>
          </div>

          <div className="problem-solution__grid">
            {/* Problem Column */}
            <div className="ps-column">
              <div className="ps-column-label ps-column-label--problem">❌ The Problem</div>
              {PROBLEMS.map((p) => (
                <div className="ps-card ps-card--problem" key={p.title}>
                  <div className="ps-card__icon ps-card__icon--problem">{p.icon}</div>
                  <div className="ps-card__title">{p.title}</div>
                  <p className="ps-card__desc">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="ps-divider">
              <div className="ps-divider__line" />
              <div className="ps-divider__arrow">→</div>
              <div className="ps-divider__line" />
            </div>

            {/* Solution Column */}
            <div className="ps-column">
              <div className="ps-column-label ps-column-label--solution">✓ The Solution</div>
              {SOLUTIONS.map((s) => (
                <div className="ps-card ps-card--solution" key={s.title}>
                  <div className="ps-card__icon ps-card__icon--solution">{s.icon}</div>
                  <div className="ps-card__title">{s.title}</div>
                  <p className="ps-card__desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ Features ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="features" ref={featuresRef} id="features">
        <div className="features__inner">
          <div className="features__header">
            <div className="features__badge">
              <RocketLaunchIcon sx={{ fontSize: 14 }} /> Core Features
            </div>
            <h2 className="features__title">Everything Your Campus Needs</h2>
            <p className="features__subtitle">
              Four powerful modules, one seamless experience — built for students, clubs, placement cells, and admins.
            </p>
          </div>

          <div className="features__grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-card__icon">{f.icon}</div>
                <div className="feature-card__title">{f.title}</div>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Use Case Flow ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="flow" ref={flowRef} id="how-it-works">
        <div className="flow__inner">
          <div className="flow__header">
            <div className="flow__badge">
              <TrendingUpIcon sx={{ fontSize: 14 }} /> Student Journey
            </div>
            <h2 className="flow__title">How It Works</h2>
            <p className="flow__subtitle">
              From login to application — everything a student needs, in four simple steps.
            </p>
          </div>

          <div className="flow__steps">
            {FLOW_STEPS.map((step, i) => (
              <div className="flow__step" key={step.label}>
                <div className="flow__step-number">
                  {step.icon}
                </div>
                <div className="flow__step-label">{step.label}</div>
                <div className="flow__step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Why CampusHub ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="why" ref={whyRef} id="why">
        <div className="why__inner">
          <div className="why__content">
            <div className="why__badge">
              <VerifiedIcon sx={{ fontSize: 14 }} /> Why CampusHub
            </div>
            <h2 className="why__title">
              Built Different. Built Better.
            </h2>
            <p className="why__desc">
              CampusHub isn't another generic portal. It's purpose-built for
              real campus workflows — designed to scale, integrate, and delight.
            </p>
            <div className="why__list">
              {WHY_ITEMS.map((item) => (
                <div className="why__list-item" key={item.title}>
                  <div className="why__list-icon">{item.icon}</div>
                  <div className="why__list-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="why__visual">
            <div className="why__visual-card">
              {WHY_METRICS.map((m) => (
                <div className="why__visual-metric" key={m.label}>
                  <span className="why__visual-metric-label">{m.label}</span>
                  <div className="why__visual-metric-bar">
                    <div className="why__visual-metric-fill" style={{ width: m.width }} />
                  </div>
                  <span className="why__visual-metric-value">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ Final CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="final-cta" ref={ctaRef} id="final-cta-section">
        <div className="final-cta__orb final-cta__orb--1" />
        <div className="final-cta__orb final-cta__orb--2" />
        <div className="final-cta__content">
          <h2 className="final-cta__title">
            Bring Your Entire Campus Online — Today
          </h2>
          <p className="final-cta__subtitle">
            Join thousands of students, faculty, and administrators already
            using CampusHub to streamline campus life.
          </p>
          <button
            className="final-cta__btn"
            onClick={() => navigate('/login')}
            id="final-cta-button"
          >
            Get Started Now <ArrowForwardIcon sx={{ fontSize: 20 }} />
          </button>
          <div className="final-cta__trust">
            <div className="final-cta__trust-item">
              <SecurityIcon sx={{ fontSize: 18 }} className="final-cta__trust-icon" />
              <span>End-to-end Secure</span>
            </div>
            <div className="final-cta__trust-item">
              <SupportAgentIcon sx={{ fontSize: 18 }} className="final-cta__trust-icon" />
              <span>Always-on Support</span>
            </div>
            <div className="final-cta__trust-item">
              <VerifiedIcon sx={{ fontSize: 18 }} className="final-cta__trust-icon" />
              <span>Trusted by 50+ Colleges</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ Footer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="landing-footer" id="landing-footer">
        <div className="landing-footer__inner">
          <div className="landing-footer__brand">
            <div className="landing-footer__icon">
              <SchoolIcon sx={{ fontSize: 15, color: '#3E2723' }} />
            </div>
            <span className="landing-footer__name">CampusHub</span>
          </div>
          <p className="landing-footer__copy">© 2025 CampusHub. All rights reserved.</p>
          <div className="landing-footer__links">
            {['Privacy', 'Terms', 'Contact'].map((l) => (
              <a key={l} href="#" className="landing-footer__link">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
