import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Chip, LinearProgress } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ForumIcon from '@mui/icons-material/Forum';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

// ── Static data for non-overview tabs ────────────────────────────────────────
const ATTENDANCE = [
  { subject: 'Data Structures',       attended: 38, total: 42 },
  { subject: 'Operating Systems',     attended: 30, total: 40 },
  { subject: 'Computer Networks',     attended: 35, total: 38 },
  { subject: 'Database Management',   attended: 28, total: 36 },
  { subject: 'Software Engineering',  attended: 22, total: 30 },
];

const ASSIGNMENTS = [
  { title: 'Binary Tree Implementation',   subject: 'Data Structures',      due: 'Jul 18, 2025', status: 'Pending'   },
  { title: 'Process Scheduling Report',    subject: 'Operating Systems',    due: 'Jul 15, 2025', status: 'Submitted' },
  { title: 'TCP/IP Protocol Analysis',     subject: 'Computer Networks',    due: 'Jul 10, 2025', status: 'Overdue'   },
  { title: 'ER Diagram — Library System',  subject: 'Database Management',  due: 'Jul 20, 2025', status: 'Pending'   },
  { title: 'SDLC Case Study',              subject: 'Software Engineering', due: 'Jul 22, 2025', status: 'Submitted' },
  { title: 'Graph Traversal Assignment',   subject: 'Data Structures',      due: 'Jul 08, 2025', status: 'Overdue'   },
];

const RESULTS = [
  { subject: 'Data Structures',       marks: 88, total: 100, grade: 'A'  },
  { subject: 'Operating Systems',     marks: 74, total: 100, grade: 'B+' },
  { subject: 'Computer Networks',     marks: 91, total: 100, grade: 'A+' },
  { subject: 'Database Management',   marks: 67, total: 100, grade: 'B'  },
  { subject: 'Software Engineering',  marks: 82, total: 100, grade: 'A'  },
  { subject: 'Mathematics III',       marks: 79, total: 100, grade: 'B+' },
];

const TIMETABLE = [
  { day: 'Monday',    slots: [
    { time: '9:00 AM',  subject: 'Data Structures',     teacher: 'Dr. Sharma',     room: 'Room 301' },
    { time: '11:00 AM', subject: 'Maths III',            teacher: 'Prof. Gupta',    room: 'Room 204' },
    { time: '2:00 PM',  subject: 'Lab: DS',              teacher: 'Dr. Sharma',     room: 'CS Lab 1' },
  ]},
  { day: 'Tuesday',   slots: [
    { time: '10:00 AM', subject: 'Operating Systems',    teacher: 'Dr. Mehta',      room: 'Room 105' },
    { time: '12:00 PM', subject: 'Computer Networks',    teacher: 'Prof. Rao',      room: 'Room 302' },
    { time: '3:00 PM',  subject: 'DBMS',                 teacher: 'Dr. Iyer',       room: 'Room 201' },
  ]},
  { day: 'Wednesday', slots: [
    { time: '9:00 AM',  subject: 'Software Engineering', teacher: 'Prof. Desai',    room: 'Room 401' },
    { time: '11:00 AM', subject: 'Data Structures',      teacher: 'Dr. Sharma',     room: 'Room 301' },
    { time: '2:00 PM',  subject: 'Lab: CN',              teacher: 'Prof. Rao',      room: 'Network Lab' },
  ]},
  { day: 'Thursday',  slots: [
    { time: '10:00 AM', subject: 'Maths III',            teacher: 'Prof. Gupta',    room: 'Room 204' },
    { time: '12:00 PM', subject: 'Operating Systems',    teacher: 'Dr. Mehta',      room: 'Room 105' },
    { time: '3:00 PM',  subject: 'Lab: DBMS',            teacher: 'Dr. Iyer',       room: 'DB Lab' },
  ]},
  { day: 'Friday',    slots: [
    { time: '9:00 AM',  subject: 'Computer Networks',    teacher: 'Prof. Rao',      room: 'Room 302' },
    { time: '11:00 AM', subject: 'Software Engineering', teacher: 'Prof. Desai',    room: 'Room 401' },
    { time: '1:00 PM',  subject: 'Seminar',              teacher: 'Dr. Kapoor',     room: 'Seminar Hall' },
  ]},
];

// Static fallback notices shown when API returns nothing
const STATIC_NOTICES = [
  { title: 'Mid-Semester Exam Schedule Released', message: 'Check the academic portal for your exam timetable.', type: 'notice', createdAt: new Date(Date.now() - 86400000) },
  { title: 'Library Book Return Reminder',        message: 'All borrowed books must be returned by July 20.',     type: 'notice', createdAt: new Date(Date.now() - 172800000) },
  { title: 'Hackathon Registration Open',         message: 'Register before July 15 to participate.',             type: 'event',  createdAt: new Date(Date.now() - 259200000) },
  { title: 'Campus Wi-Fi Maintenance',            message: 'Network downtime on July 14 from 2–4 AM.',            type: 'notice', createdAt: new Date(Date.now() - 345600000) },
];

const DEADLINES = [
  { title: 'Binary Tree Implementation',  subject: 'Data Structures',     due: 'Jul 18', urgent: true  },
  { title: 'ER Diagram Submission',       subject: 'Database Management', due: 'Jul 20', urgent: false },
  { title: 'SDLC Case Study',             subject: 'Software Engineering', due: 'Jul 22', urgent: false },
];



const TABS = [
  { key: 'overview',       label: 'Overview',       icon: <BarChartIcon sx={{ fontSize: 16 }} />       },
  { key: 'attendance',     label: 'Attendance',     icon: <StarIcon sx={{ fontSize: 16 }} />            },
  { key: 'assignments',    label: 'Assignments',    icon: <AssignmentIcon sx={{ fontSize: 16 }} />      },
  { key: 'results',        label: 'Results',        icon: <BarChartIcon sx={{ fontSize: 16 }} />        },
  { key: 'timetable',      label: 'Timetable',      icon: <CalendarTodayIcon sx={{ fontSize: 16 }} />   },
  { key: 'communication',  label: 'Communication',  icon: <ForumIcon sx={{ fontSize: 16 }} />           },
];

const STATUS_STYLE = {
  Pending:   'bg-orange-50 text-orange-600 border border-orange-200',
  Submitted: 'bg-green-50  text-green-700  border border-green-200',
  Overdue:   'bg-red-50    text-red-600    border border-red-200',
};

const GRADE_COLOR = { 'A+': 'var(--color-primary-light)', A: 'var(--color-primary)', 'B+': '#0284c7', B: '#d97706', C: 'var(--color-error)' };

// ── Helpers ──────────────────────────────────────────────────────────────────
function relativeTime(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const TYPE_BADGE = {
  placement: 'bg-orange-50 text-orange-600 border border-orange-200',
  event:     'bg-yellow-50 text-yellow-700 border border-yellow-200',
  club:      'border',
  notice:    'border',
};
const TYPE_BADGE_STYLE = {
  club:   { background: 'var(--bg-secondary)', color: 'var(--primary)', borderColor: 'var(--primary)' },
  notice: { background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderColor: 'var(--bg-secondary)' },
};

// ── Sub-components ────────────────────────────────────────────────────────────
function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl p-6 ${className}`} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', transition: 'all 0.3s' }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{children}</h2>;
}

// ── Tab content components ────────────────────────────────────────────────────
function AttendanceTab() {
  return (
    <Card>
      <SectionTitle>Subject-wise Attendance</SectionTitle>
      <div className="space-y-5">
        {ATTENDANCE.map((a) => {
          const pct = Math.round((a.attended / a.total) * 100);
          const color = pct >= 75 ? 'var(--color-success)' : pct >= 60 ? '#f59e0b' : 'var(--color-error)';
          return (
            <div key={a.subject}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-700">{a.subject}</span>
                <span className="font-semibold" style={{ color }}>
                  {a.attended}/{a.total} &nbsp;({pct}%)
                </span>
              </div>
              <LinearProgress
                variant="determinate" value={pct}
                sx={{ height: 8, borderRadius: 8, bgcolor: 'var(--border)',
                  '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 8 } }}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function AssignmentsTab() {
  const [assignments, setAssignments] = useState(ASSIGNMENTS.map(a => ({ ...a, uploadedFile: null })));

  const handleUpload = (index, file) => {
    if (!file) return;
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload PDF, DOC, or DOCX files only.');
      return;
    }
    setAssignments(prev => prev.map((a, i) =>
      i === index ? { ...a, status: 'Submitted', uploadedFile: file.name } : a
    ));
  };

  return (
    <Card>
      <SectionTitle>My Assignments</SectionTitle>
      <div className="space-y-3">
        {assignments.map((a, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: a.uploadedFile ? 8 : 0 }}>
              <div style={{ flex: 1, minWidth: 0, marginRight: 16 }}>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{a.title}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{a.subject} · Due {a.due}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${STATUS_STYLE[a.status]}`}>
                  {a.status}
                </span>
                {a.status !== 'Submitted' && (
                  <label style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: 'var(--primary)', color: '#1C1917',
                    borderRadius: 10, padding: '6px 14px', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(198,90,46,0.3)',
                  }}>
                    <CloudUploadIcon sx={{ fontSize: 14 }} />
                    Upload
                    <input type="file" accept=".pdf,.doc,.docx" hidden
                      onChange={(e) => handleUpload(i, e.target.files[0])} />
                  </label>
                )}
              </div>
            </div>
            {a.uploadedFile && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 8,
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                marginTop: 8,
              }}>
                <CheckCircleIcon sx={{ fontSize: 14, color: '#059669' }} />
                <span style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>{a.uploadedFile}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ResultsTab() {
  const avg = Math.round(RESULTS.reduce((s, r) => s + r.marks, 0) / RESULTS.length);

  const downloadPDF = () => {
    // Generate a simple text-based result document
    const lines = [
      'CAMPUSHUB — SEMESTER RESULT REPORT',
      '═'.repeat(50),
      '',
      `Student Name: ${document.querySelector('[data-student-name]')?.textContent || 'Student'}`,
      `Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      '',
      '─'.repeat(50),
      'SUBJECT-WISE RESULTS',
      '─'.repeat(50),
      '',
      ...RESULTS.map(r => `  ${r.subject.padEnd(25)} ${r.marks}/${r.total}  Grade: ${r.grade}`),
      '',
      '─'.repeat(50),
      `  SEMESTER AVERAGE: ${avg}/100`,
      '─'.repeat(50),
      '',
      '© 2025 CampusHub. All rights reserved.',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CampusHub_Semester_Result.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Download button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={downloadPDF} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--primary)', color: '#1C1917',
          border: 'none', borderRadius: 12, padding: '10px 22px',
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(201,162,39,0.3)', transition: 'all 0.2s',
        }}>
          <DownloadIcon sx={{ fontSize: 16 }} /> Download Result
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {RESULTS.map((r) => (
          <Card key={r.subject} className="!p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r.subject}</p>
              <span className="text-lg font-extrabold ml-2" style={{ color: GRADE_COLOR[r.grade] || '#374151' }}>
                {r.grade}
              </span>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{r.marks}<span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/{r.total}</span></p>
            <LinearProgress variant="determinate" value={(r.marks / r.total) * 100}
              sx={{ mt: 1.5, height: 6, borderRadius: 6, bgcolor: '#f1f5f9',
                '& .MuiLinearProgress-bar': { bgcolor: GRADE_COLOR[r.grade] || 'var(--color-primary)', borderRadius: 6 } }} />
          </Card>
        ))}
      </div>
      <Card className="!p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
          <BarChartIcon sx={{ color: 'var(--primary)', fontSize: 28 }} />
        </div>
        <div>
          <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Semester Average</p>
          <p className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{avg}<span className="text-base font-normal" style={{ color: 'var(--text-muted)' }}>/100</span></p>
        </div>
      </Card>
    </div>
  );
}

function TimetableTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {TIMETABLE.map((d) => (
        <Card key={d.day} className="!p-4">
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: 'var(--primary)' }}>{d.day}</p>
          <div className="space-y-3">
            {d.slots.map((s, i) => (
              <div key={i} style={{
                padding: '10px 12px', borderRadius: 12,
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                transition: 'all 0.2s',
              }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{s.subject}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>
                  <AccessTimeIcon sx={{ fontSize: 12 }} /> {s.time}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>
                  <PersonIcon sx={{ fontSize: 12 }} /> {s.teacher}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                  <RoomIcon sx={{ fontSize: 12 }} /> {s.room}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function NotificationList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((n, i) => (
        <div key={n._id || i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--secondary-bg)' }}>
          <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--gold)' }} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--brown)' }}>{n.title}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 capitalize ${TYPE_BADGE[n.type] || ''}`}
                style={TYPE_BADGE_STYLE[n.type] || {}}>
                {n.type}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-dark)' }}>{n.message}</p>
          </div>
          <span className="text-xs whitespace-nowrap flex-shrink-0" style={{ color: 'var(--text-dark)' }}>{relativeTime(n.createdAt)}</span>
        </div>
      ))}
    </div>
  );
}

function CommunicationTab({ notifications }) {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([
    { text: 'When will the mid-semester exam results be published?', time: new Date(Date.now() - 3600000) },
    { text: 'Can I change my elective subject after registration?', time: new Date(Date.now() - 86400000) },
  ]);

  const handleSubmitQuestion = () => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setQuestions(prev => [{ text: trimmed, time: new Date() }, ...prev]);
    setQuestion('');
  };

  return (
    <div className="space-y-6">
      {/* Ask a Question */}
      <Card>
        <SectionTitle>💬 Ask a Question</SectionTitle>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="text"
            placeholder="Type your question here..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmitQuestion()}
            style={{
              flex: 1, padding: '12px 16px', borderRadius: 12,
              border: '1px solid var(--border)', background: 'var(--input-bg)',
              color: 'var(--text-primary)', fontSize: 14,
              outline: 'none', transition: 'border-color 0.2s',
            }}
          />
          <button onClick={handleSubmitQuestion} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--primary)', color: '#1C1917',
            border: 'none', borderRadius: 12, padding: '12px 22px',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(201,162,39,0.3)', transition: 'all 0.2s',
          }}>
            <SendIcon sx={{ fontSize: 16 }} /> Send
          </button>
        </div>

        {/* Questions List */}
        {questions.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Your Questions</p>
            <div className="space-y-2">
              {questions.map((q, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 10,
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                }}>
                  <QuestionAnswerIcon sx={{ fontSize: 16, color: 'var(--primary)', flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{q.text}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {q.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Notifications */}
      <Card>
        <SectionTitle>Notifications & Updates</SectionTitle>
        <NotificationList items={notifications} />
      </Card>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myClubs, setMyClubs] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [appliedCount, setAppliedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/student/my-clubs'),
      api.get('/student/my-events'),
      api.get('/student/clubs'),
      api.get('/placement'),
      api.get('/student/notifications'),
    ]).then(([c, e, ac, p, n]) => {
      setMyClubs(c.data.data);
      setMyEvents(e.data.data);
      setAppliedCount(p.data.data.filter((x) => x.hasApplied).length);
      setNotifications(n.data.data.length ? n.data.data : STATIC_NOTICES);
    }).catch(() => { setNotifications(STATIC_NOTICES); }).finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const upcomingEvents = myEvents.filter((e) => new Date(e.date) >= new Date());

  const STATS = [
    { label: 'Clubs Joined',      value: myClubs.length,       icon: <GroupsIcon sx={{ fontSize: 20 }} />,  bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', to: '/student/my-activities' },
    { label: 'Events Registered', value: myEvents.length,      icon: <EventIcon sx={{ fontSize: 20 }} />,   bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-100',   to: '/student/my-activities' },
    { label: 'Upcoming Events',   value: upcomingEvents.length, icon: <StarIcon sx={{ fontSize: 20 }} />,   bg: 'bg-emerald-50',text: 'text-emerald-600',border: 'border-emerald-100',to: '/student/events'        },
    { label: 'Applications',      value: appliedCount,          icon: <WorkIcon sx={{ fontSize: 20 }} />,   bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', to: '/student/my-activities' },
  ];

  return (
    <div style={{ background: 'var(--primary-bg)' }} className="min-h-full">

      {/* ── Header ── */}
      <div className="mb-6">
        <p className="text-sm" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>{greeting},</p>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{user?.name} 👋</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Welcome back to your student portal.</p>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 mb-7 rounded-2xl p-1.5 overflow-x-auto" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
            style={activeTab === t.key
              ? { background: 'var(--primary)', color: '#FFFFFF', fontWeight: 800, boxShadow: 'var(--nav-active-shadow)' }
              : { color: 'var(--text-secondary)' }}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Attendance ── */}
      {activeTab === 'attendance' && <AttendanceTab />}

      {/* ── Tab: Assignments ── */}
      {activeTab === 'assignments' && <AssignmentsTab />}

      {/* ── Tab: Results ── */}
      {activeTab === 'results' && <ResultsTab />}

      {/* ── Tab: Timetable ── */}
      {activeTab === 'timetable' && <TimetableTab />}

      {/* ── Tab: Communication ── */}
      {activeTab === 'communication' && <CommunicationTab notifications={notifications} />}

      {/* ── Tab: Overview ── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">

          {/* Row 1 — Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <button key={s.label} onClick={() => navigate(s.to)}
                className="rounded-2xl p-5 text-left transition-all duration-200"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
                onMouseOver={e => { e.currentTarget.style.background = 'var(--card-bg-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'var(--card-bg)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(198,90,46,0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', lineHeight: 1.1 }}>
                  {loading ? <CircularProgress size={20} sx={{ color: 'var(--accent)' }} /> : s.value}
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
              </button>
            ))}
          </div>

          {/* Row 2 — Upcoming Events + My Clubs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* My Upcoming Events */}
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <EventIcon sx={{ color: 'var(--primary)', fontSize: 18 }} /> My Upcoming Events
                </h2>
                <button onClick={() => navigate('/student/events')}
                  className="text-xs font-bold flex items-center gap-0.5 hover:underline" style={{ color: 'var(--primary)' }}>
                  View all <ArrowForwardIcon sx={{ fontSize: 13 }} />
                </button>
              </div>
              {loading
                ? <div className="flex justify-center py-8"><CircularProgress sx={{ color: 'var(--gold)' }} /></div>
                : upcomingEvents.length === 0
                  ? (
                    <div className="text-center py-8">
                      <EventIcon sx={{ fontSize: 32, color: '#e2e8f0' }} />
                      <p className="text-gray-400 text-sm mt-2">No upcoming events</p>
                      <button onClick={() => navigate('/student/events')}
                        className="text-xs text-indigo-600 font-semibold mt-2 hover:underline">Browse events →</button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {upcomingEvents.slice(0, 4).map((e) => (
                        <div key={e._id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                          <div className="w-10 h-10 rounded-lg flex flex-col items-center justify-center flex-shrink-0" style={{ background: 'var(--primary)', color: '#FFF' }}>
                            <span className="text-base font-bold leading-none">{new Date(e.date).getDate()}</span>
                            <span className="text-xs" style={{ color: '#FFF', opacity: 0.85 }}>{new Date(e.date).toLocaleString('default', { month: 'short' })}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{e.title}</p>
                            <div className="flex gap-2 text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                              {e.time && <span className="flex items-center gap-0.5"><AccessTimeIcon sx={{ fontSize: 11 }} />{e.time}</span>}
                              {e.venue && <span className="flex items-center gap-0.5"><LocationOnIcon sx={{ fontSize: 11 }} />{e.venue}</span>}
                            </div>
                          </div>
                          {e.club && <Chip label={e.club.name} size="small" sx={{ bgcolor: 'var(--card-bg)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.6rem', border: '1px solid var(--primary)' }} />}
                        </div>
                      ))}
                    </div>
                  )}
            </Card>

            {/* My Clubs */}
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <GroupsIcon sx={{ color: 'var(--primary)', fontSize: 18 }} /> My Clubs
                </h2>
                <button onClick={() => navigate('/student/clubs')}
                  className="text-xs font-bold flex items-center gap-0.5 hover:underline" style={{ color: 'var(--primary)' }}>
                  Browse more <ArrowForwardIcon sx={{ fontSize: 13 }} />
                </button>
              </div>
              {loading
                ? <div className="flex justify-center py-8"><CircularProgress sx={{ color: 'var(--gold)' }} /></div>
                : myClubs.length === 0
                  ? (
                    <div className="text-center py-8">
                      <GroupsIcon sx={{ fontSize: 32, color: '#e2e8f0' }} />
                      <p className="text-gray-400 text-sm mt-2">You haven't joined any clubs</p>
                      <button onClick={() => navigate('/student/clubs')}
                        className="text-xs text-purple-600 font-semibold mt-2 hover:underline">Explore clubs →</button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {myClubs.slice(0, 4).map((c) => (
                        <div key={c._id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'var(--primary)', color: '#FFF' }}>
                            {c.name[0].toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                            {c.category && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{c.category}</p>}
                          </div>
                          <Chip label="Joined" size="small" sx={{ bgcolor: 'var(--card-bg)', color: 'var(--primary)', fontWeight: 800, fontSize: '0.6rem', border: '1px solid var(--primary)' }} />
                        </div>
                      ))}
                    </div>
                  )}
            </Card>
          </div>

          {/* Row 3 — Recent Notices + Study Streak */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Recent Notices — live from API */}
            <Card>
              <div className="flex items-center gap-2 mb-5">
                <NotificationsNoneIcon sx={{ color: 'var(--primary)', fontSize: 18 }} />
                <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Recent Notices</h2>
              </div>
              {loading
                ? <div className="flex justify-center py-6"><CircularProgress size={20} sx={{ color: 'var(--gold)' }} /></div>
                : <NotificationList items={notifications.slice(0, 4)} />}
            </Card>

            {/* Study Streak */}
            <div className="rounded-2xl p-6 shadow-sm text-white flex flex-col justify-between"
              style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--brown) 100%)' }}>
              <div className="flex items-center gap-2 mb-4">
                <LocalFireDepartmentIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.9)' }} />
                <h2 className="text-sm font-semibold text-white/90">Study Streak</h2>
              </div>
              <div>
                <p className="text-6xl font-extrabold leading-none">12</p>
                <p className="text-lg font-semibold mt-1 text-white/90">Days</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-sm text-white/80 leading-relaxed">
                  🔥 You're on a roll! Keep studying daily to maintain your streak.
                </p>
              </div>
            </div>
          </div>

          {/* Row 4 — Upcoming Deadlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Upcoming Deadlines */}
            <Card>
              <div className="flex items-center gap-2 mb-5">
                <AssignmentIcon sx={{ color: 'var(--primary)', fontSize: 18 }} />
                <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Upcoming Deadlines</h2>
              </div>
              <div className="space-y-3">
                {DEADLINES.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--secondary-bg)' }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${d.urgent ? 'bg-red-500' : 'bg-yellow-400'}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{d.title}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{d.subject}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ml-3 ${
                      d.urgent ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      {d.due}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Spacer — balanced layout */}
            <div />
          </div>

        </div>
      )}

      {/* ━━ AI CHATBOT PLACEHOLDER ━━━━━━━━━━━━━━━━━━━━ */}
      <ChatbotPanel />
    </div>
  );
}

// ── AI Chatbot Placeholder Component ──
function ChatbotPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 I\'m CampusBot, your AI assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: 'Thanks for your question! AI integration is coming soon. Stay tuned! 🚀' }]);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 28px rgba(198,90,46,0.5)',
            transition: 'all 0.3s',
            animation: 'pulseGlow 3s ease-in-out infinite',
          }}
        >
          <SmartToyIcon sx={{ fontSize: 26, color: '#FFFFFF' }} />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
          width: 370, height: 500, borderRadius: 20,
          background: 'var(--card-bg, #FFF)', border: '1px solid var(--border)',
          boxShadow: '0 16px 60px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            color: '#1C1917',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SmartToyIcon sx={{ fontSize: 22 }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>CampusBot</p>
                <p style={{ fontSize: 11, margin: 0, opacity: 0.7 }}>AI Assistant · Coming Soon</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%',
              width: 30, height: 30, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CloseIcon sx={{ fontSize: 16, color: '#1C1917' }} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%', padding: '10px 14px', borderRadius: 14,
                fontSize: 13, lineHeight: 1.5,
                ...(m.from === 'user'
                  ? { background: 'var(--primary)', color: '#1C1917', borderBottomRightRadius: 4 }
                  : { background: 'var(--bg-secondary, #f5f5f5)', color: 'var(--text-primary)', borderBottomLeftRadius: 4 }),
              }}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 14px', borderTop: '1px solid var(--border)',
            display: 'flex', gap: 8, background: 'var(--card-bg, #FFF)',
          }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: 10,
                border: '1px solid var(--border)', background: 'var(--input-bg, #f9f9f9)',
                color: 'var(--text-primary)', fontSize: 13, outline: 'none',
              }}
            />
            <button onClick={handleSend} style={{
              width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: 'var(--primary)', color: '#1C1917',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}>
              <SendIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 6px 28px rgba(201,162,39,0.4); }
          50% { box-shadow: 0 6px 28px rgba(201,162,39,0.4), 0 0 0 12px rgba(201,162,39,0); }
        }
      `}</style>
    </>
  );
}
