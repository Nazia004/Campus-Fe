import { useState } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useAuth } from '../../context/AuthContext';

// ── Course → semester count mapping ──────────────────────────────────────────
const COURSE_SEMESTERS = {
  'B.Tech': 8,
  'B.E.': 8,
  'B.Sc': 6,
  'BSc': 6,
  'B.A.': 6,
  'BA': 6,
  'B.Com': 6,
  'BCom': 6,
  'BBA': 6,
  'BCA': 6,
  'M.Tech': 4,
  'M.Sc': 4,
  'MSc': 4,
  'MBA': 4,
  'MCA': 4,
  'M.A.': 4,
  'Ph.D': 6,
  'Diploma': 6,
};

// Detect course from department string
function detectCourse(department) {
  if (!department) return 'B.Tech';
  const dept = department.toLowerCase();
  // Check for explicit course prefixes
  for (const [course] of Object.entries(COURSE_SEMESTERS)) {
    if (dept.includes(course.toLowerCase())) return course;
  }
  // Default: if dept contains engineering-related keywords → B.Tech
  if (['cse', 'ece', 'eee', 'mech', 'civil', 'it', 'computer', 'electrical', 'electronics', 'engineering'].some(k => dept.includes(k))) {
    return 'B.Tech';
  }
  return 'B.Tech'; // fallback
}

// ── Generate semester fee data based on course ───────────────────────────────
function generateFeeData(totalSemesters) {
  const semesters = [];
  const startYear = 2023;

  for (let i = 1; i <= totalSemesters; i++) {
    const yearOffset = Math.floor((i - 1) / 2);
    const isOdd = i % 2 !== 0;
    const academicYear = `${startYear + yearOffset}–${(startYear + yearOffset + 1).toString().slice(2)}`;
    const session = `${academicYear} (${isOdd ? 'Odd' : 'Even'})`;
    const dueMonth = isOdd ? '08' : '01';
    const dueYear = isOdd ? startYear + yearOffset : startYear + yearOffset + 1;

    // Fee amounts increase slightly each year
    const tuitionFee = 45000 + yearOffset * 3000;
    const hostelFee = 30000 + yearOffset * 2000;
    const examFee = 3000 + yearOffset * 500;
    const totalFee = tuitionFee + hostelFee + examFee;

    // Determine payment status based on semester position
    let status, paidAmount, paidOn, transactionId, lateFine;
    if (i <= totalSemesters - 2) {
      // Fully paid for earlier semesters
      status = 'paid';
      paidAmount = totalFee;
      const payDay = Math.floor(Math.random() * 10) + 5;
      paidOn = `${dueYear}-${dueMonth}-${String(payDay).padStart(2, '0')}`;
      transactionId = `TXN${dueYear}${dueMonth}${String(payDay).padStart(2, '0')}${String.fromCharCode(65 + i)}${i}`;
      // Some paid semesters may have late fine
      if (i === 3) {
        lateFine = 250;
        paidOn = `${dueYear}-${dueMonth}-20`;
      }
    } else if (i === totalSemesters - 1) {
      // Partially paid for second-to-last semester
      status = 'partial';
      paidAmount = Math.round(totalFee * 0.5);
    } else {
      // Unpaid for current semester
      status = 'unpaid';
      paidAmount = 0;
    }

    semesters.push({
      semester: `Semester ${i}`,
      session,
      tuitionFee,
      hostelFee,
      examFee,
      totalFee,
      paidAmount,
      dueDate: `${dueYear}-${dueMonth}-15`,
      finePerDay: 50 + yearOffset * 25,
      maxFine: 2500 + yearOffset * 500,
      status,
      ...(paidOn && { paidOn }),
      ...(transactionId && { transactionId }),
      ...(lateFine && { lateFine }),
    });
  }

  return semesters;
}

function formatCurrency(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function getDaysOverdue(dueDateStr) {
  const due = new Date(dueDateStr);
  const today = new Date();
  const diff = Math.floor((today - due) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function getStatusConfig(status) {
  switch (status) {
    case 'paid':
      return { label: 'Paid', color: '#059669', bg: 'rgba(5,150,105,0.1)', border: 'rgba(5,150,105,0.2)', icon: <CheckCircleIcon sx={{ fontSize: 14 }} /> };
    case 'partial':
      return { label: 'Partially Paid', color: '#d97706', bg: 'rgba(217,119,6,0.1)', border: 'rgba(217,119,6,0.2)', icon: <WarningAmberIcon sx={{ fontSize: 14 }} /> };
    case 'unpaid':
      return { label: 'Unpaid', color: '#dc2626', bg: 'rgba(220,38,38,0.1)', border: 'rgba(220,38,38,0.2)', icon: <ErrorOutlineIcon sx={{ fontSize: 14 }} /> };
    default:
      return { label: status, color: '#6b7280', bg: '#f3f4f6', border: '#e5e7eb', icon: null };
  }
}

// ── Summary Cards ────────────────────────────────────────────────────────────
function SummaryCards({ data }) {
  const totalFees = data.reduce((s, d) => s + d.totalFee, 0);
  const totalPaid = data.reduce((s, d) => s + d.paidAmount, 0);
  const totalDue = totalFees - totalPaid;

  const cards = [
    { label: 'Total Fees', value: formatCurrency(totalFees), icon: <ReceiptLongIcon sx={{ fontSize: 22 }} />, gradient: 'linear-gradient(135deg, #C9A227, #A67C00)' },
    { label: 'Total Paid', value: formatCurrency(totalPaid), icon: <CheckCircleIcon sx={{ fontSize: 22 }} />, gradient: 'linear-gradient(135deg, #059669, #047857)' },
    { label: 'Outstanding Due', value: formatCurrency(totalDue), icon: <CurrencyRupeeIcon sx={{ fontSize: 22 }} />, gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
      {cards.map((c) => (
        <div key={c.label} style={{
          background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 20, boxShadow: 'var(--shadow)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
        >
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: c.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', marginBottom: 14,
          }}>
            {c.icon}
          </div>
          <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>{c.value}</p>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', margin: '4px 0 0' }}>{c.label}</p>
        </div>
      ))}
    </div>
  );
}

// ── Semester Card (Accordion) ────────────────────────────────────────────────
function SemesterCard({ fee }) {
  const [expanded, setExpanded] = useState(fee.status !== 'paid');
  const statusConfig = getStatusConfig(fee.status);
  const dueAmount = fee.totalFee - fee.paidAmount;
  const daysOverdue = getDaysOverdue(fee.dueDate);
  const currentFine = fee.status !== 'paid' && daysOverdue > 0
    ? Math.min(daysOverdue * fee.finePerDay, fee.maxFine)
    : 0;

  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: 16, overflow: 'hidden',
      boxShadow: 'var(--shadow)', transition: 'all 0.2s',
    }}>
      {/* Header (clickable) */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 22px', border: 'none', cursor: 'pointer',
          background: 'transparent', transition: 'background 0.2s',
        }}
        onMouseOver={e => { e.currentTarget.style.background = 'var(--hover-bg, rgba(201,162,39,0.04))'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'rgba(201,162,39,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--primary)',
          }}>
            <AccountBalanceIcon sx={{ fontSize: 20 }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{fee.semester}</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{fee.session}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '5px 12px', borderRadius: 20,
            fontSize: 12, fontWeight: 600,
            color: statusConfig.color,
            background: statusConfig.bg,
            border: `1px solid ${statusConfig.border}`,
          }}>
            {statusConfig.icon} {statusConfig.label}
          </span>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0, minWidth: 80, textAlign: 'right' }}>
            {formatCurrency(fee.totalFee)}
          </p>
          <ExpandMoreIcon
            sx={{
              fontSize: 20, color: 'var(--text-muted)',
              transition: 'transform 0.3s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </button>

      {/* Expandable details */}
      <div style={{
        overflow: 'hidden',
        maxHeight: expanded ? '600px' : '0',
        transition: 'max-height 0.4s ease',
      }}>
        <div style={{ padding: '0 22px 22px', borderTop: '1px solid var(--border)' }}>
          {/* Fee Breakdown */}
          <div style={{ marginTop: 18 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Fee Breakdown</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Tuition Fee', value: fee.tuitionFee },
                { label: 'Hostel Fee', value: fee.hostelFee },
                { label: 'Exam Fee', value: fee.examFee },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: 'var(--bg-secondary, rgba(0,0,0,0.02))' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.12)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#059669', margin: 0, textTransform: 'uppercase' }}>Paid</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#059669', margin: '4px 0 0' }}>{formatCurrency(fee.paidAmount)}</p>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: dueAmount > 0 ? 'rgba(220,38,38,0.06)' : 'rgba(5,150,105,0.06)', border: `1px solid ${dueAmount > 0 ? 'rgba(220,38,38,0.12)' : 'rgba(5,150,105,0.12)'}` }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: dueAmount > 0 ? '#dc2626' : '#059669', margin: 0, textTransform: 'uppercase' }}>Due</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: dueAmount > 0 ? '#dc2626' : '#059669', margin: '4px 0 0' }}>{formatCurrency(dueAmount)}</p>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.12)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#C9A227', margin: 0, textTransform: 'uppercase' }}>Total</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 0' }}>{formatCurrency(fee.totalFee)}</p>
            </div>
          </div>

          {/* Due Date & Fine Info */}
          <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, padding: '14px 16px', borderRadius: 12, background: 'var(--bg-secondary, rgba(0,0,0,0.02))', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <CalendarTodayIcon sx={{ fontSize: 14, color: 'var(--primary)' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Due Date</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{formatDate(fee.dueDate)}</p>
              {fee.status !== 'paid' && daysOverdue > 0 && (
                <p style={{ fontSize: 12, color: '#dc2626', fontWeight: 600, margin: '4px 0 0' }}>
                  ⚠️ {daysOverdue} days overdue
                </p>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 200, padding: '14px 16px', borderRadius: 12, background: currentFine > 0 ? 'rgba(220,38,38,0.04)' : 'var(--bg-secondary, rgba(0,0,0,0.02))', border: `1px solid ${currentFine > 0 ? 'rgba(220,38,38,0.12)' : 'var(--border)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <WarningAmberIcon sx={{ fontSize: 14, color: currentFine > 0 ? '#dc2626' : 'var(--text-muted)' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Late Fine Policy</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
                {formatCurrency(fee.finePerDay)}/day · Max {formatCurrency(fee.maxFine)}
              </p>
              {currentFine > 0 && (
                <p style={{ fontSize: 14, fontWeight: 700, color: '#dc2626', margin: '4px 0 0' }}>
                  Current fine: {formatCurrency(currentFine)}
                </p>
              )}
              {fee.lateFine > 0 && fee.status === 'paid' && (
                <p style={{ fontSize: 12, color: '#d97706', fontWeight: 600, margin: '4px 0 0' }}>
                  Late fine paid: {formatCurrency(fee.lateFine)}
                </p>
              )}
            </div>
          </div>

          {/* Transaction info (if paid) */}
          {fee.paidOn && (
            <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 10, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircleIcon sx={{ fontSize: 16, color: '#059669' }} />
              <span style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>
                Paid on {formatDate(fee.paidOn)} · Transaction ID: {fee.transactionId}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page Component ──────────────────────────────────────────────────────
export default function FeeStructure() {
  const { user } = useAuth();
  const course = detectCourse(user?.department);
  const totalSemesters = COURSE_SEMESTERS[course] || 8;
  const feeData = generateFeeData(totalSemesters);

  return (
    <div style={{ background: 'var(--primary-bg)' }} className="min-h-full">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, var(--primary), var(--accent, #A67C00))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(201,162,39,0.3)',
          }}>
            <AccountBalanceIcon sx={{ fontSize: 22, color: '#fff' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Fee Structure</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
              {course} · {totalSemesters} Semesters · {user?.name || 'Student'}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards data={feeData} />

      {/* Semester-wise Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {feeData.map((fee) => (
          <SemesterCard key={fee.semester} fee={fee} />
        ))}
      </div>
    </div>
  );
}
