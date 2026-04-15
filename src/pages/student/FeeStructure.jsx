import { useState } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAuth } from '../../context/AuthContext';

// ── Course → semester count mapping ──────────────────────────────────────────
const COURSE_SEMESTERS = {
  'B.Tech': 8, 'B.E.': 8, 'B.Sc': 6, 'BSc': 6, 'B.A.': 6, 'BA': 6,
  'B.Com': 6, 'BCom': 6, 'BBA': 6, 'BCA': 6, 'M.Tech': 4, 'M.Sc': 4,
  'MSc': 4, 'MBA': 4, 'MCA': 4, 'M.A.': 4, 'Ph.D': 6, 'Diploma': 6,
};

function detectCourse(department) {
  if (!department) return 'B.Tech';
  const dept = department.toLowerCase();
  for (const [course] of Object.entries(COURSE_SEMESTERS)) {
    if (dept.includes(course.toLowerCase())) return course;
  }
  if (['cse', 'ece', 'eee', 'mech', 'civil', 'it', 'computer', 'electrical', 'electronics', 'engineering'].some(k => dept.includes(k))) {
    return 'B.Tech';
  }
  return 'B.Tech';
}

// ── Generate semester fee data ───────────────────────────────────────────────
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

    const tuitionFee = 45000 + yearOffset * 3000;
    const hostelFee = 30000 + yearOffset * 2000;
    const examFee = 3000 + yearOffset * 500;
    const totalFee = tuitionFee + hostelFee + examFee;

    let status, paidAmount, paidOn, transactionId, lateFine;
    if (i <= totalSemesters - 2) {
      status = 'paid';
      paidAmount = totalFee;
      const payDay = Math.floor(Math.random() * 10) + 5;
      paidOn = `${dueYear}-${dueMonth}-${String(payDay).padStart(2, '0')}`;
      transactionId = `TXN${dueYear}${dueMonth}${String(payDay).padStart(2, '0')}${String.fromCharCode(65 + i)}${i}`;
      if (i === 3) {
        lateFine = 250;
        paidOn = `${dueYear}-${dueMonth}-20`;
      }
    } else if (i === totalSemesters - 1) {
      status = 'partial';
      paidAmount = Math.round(totalFee * 0.5);
    } else {
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

function fmt(amount) { return '₹' + amount.toLocaleString('en-IN'); }

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getDaysOverdue(dueDateStr) {
  const diff = Math.floor((new Date() - new Date(dueDateStr)) / 86400000);
  return diff > 0 ? diff : 0;
}

function getStatusConfig(status) {
  const map = {
    paid: { label: 'Paid', color: '#059669', bg: 'rgba(5,150,105,0.1)', border: 'rgba(5,150,105,0.2)', icon: <CheckCircleIcon sx={{ fontSize: 13 }} /> },
    partial: { label: 'Partial', color: '#d97706', bg: 'rgba(217,119,6,0.1)', border: 'rgba(217,119,6,0.2)', icon: <WarningAmberIcon sx={{ fontSize: 13 }} /> },
    unpaid: { label: 'Unpaid', color: '#dc2626', bg: 'rgba(220,38,38,0.1)', border: 'rgba(220,38,38,0.2)', icon: <ErrorOutlineIcon sx={{ fontSize: 13 }} /> },
  };
  return map[status] || { label: status, color: '#6b7280', bg: '#f3f4f6', border: '#e5e7eb', icon: null };
}

// ── Summary Cards ────────────────────────────────────────────────────────────
function SummaryCards({ data }) {
  const totalFees = data.reduce((s, d) => s + d.totalFee, 0);
  const totalPaid = data.reduce((s, d) => s + d.paidAmount, 0);
  const totalDue = totalFees - totalPaid;
  const paidPct = Math.round((totalPaid / totalFees) * 100);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
      {[
        { label: 'Total Fees', value: fmt(totalFees), icon: <ReceiptLongIcon sx={{ fontSize: 20 }} />, color: '#C9A227' },
        { label: 'Total Paid', value: fmt(totalPaid), sub: `${paidPct}% paid`, icon: <CheckCircleIcon sx={{ fontSize: 20 }} />, color: '#059669' },
        { label: 'Outstanding Due', value: fmt(totalDue), sub: totalDue === 0 ? 'All clear ✓' : 'Payment pending', icon: <CurrencyRupeeIcon sx={{ fontSize: 20 }} />, color: totalDue > 0 ? '#dc2626' : '#059669' },
      ].map((c) => (
        <div key={c.label} style={{
          background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: 16, padding: '20px 22px',
          boxShadow: 'var(--shadow)', transition: 'transform 0.2s',
          position: 'relative', overflow: 'hidden',
        }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'none'; }}
        >
          <div style={{ position: 'absolute', top: -8, right: -8, width: 60, height: 60, borderRadius: '50%', background: `${c.color}10`, }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ color: c.color }}>{c.icon}</div>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{c.label}</span>
          </div>
          <p style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>{c.value}</p>
          {c.sub && <p style={{ fontSize: 12, color: c.color, fontWeight: 600, margin: '6px 0 0' }}>{c.sub}</p>}
        </div>
      ))}
    </div>
  );
}

// ── Semester Row ─────────────────────────────────────────────────────────────
function SemesterRow({ fee }) {
  const [expanded, setExpanded] = useState(fee.status !== 'paid');
  const sc = getStatusConfig(fee.status);
  const dueAmount = fee.totalFee - fee.paidAmount;
  const daysOverdue = getDaysOverdue(fee.dueDate);
  const currentFine = fee.status !== 'paid' && daysOverdue > 0
    ? Math.min(daysOverdue * fee.finePerDay, fee.maxFine) : 0;
  const paidPct = Math.round((fee.paidAmount / fee.totalFee) * 100);

  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: 14, overflow: 'hidden',
      boxShadow: 'var(--shadow)',
      borderLeft: `4px solid ${sc.color}`,
    }}>
      {/* Collapsed header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          padding: '16px 20px', border: 'none', cursor: 'pointer',
          background: 'transparent', gap: 16,
        }}
        onMouseOver={e => { e.currentTarget.style.background = 'var(--hover-bg, rgba(201,162,39,0.03))'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        {/* Left: Semester info */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          <div style={{ textAlign: 'left', minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{fee.semester}</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '2px 0 0' }}>{fee.session}</p>
          </div>
        </div>

        {/* Center: Progress bar (compact) */}
        <div style={{ width: 120, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
            <span>{paidPct}% paid</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: 'var(--border)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 3, width: `${paidPct}%`, background: sc.color, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Right: Status + Amount */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
            color: sc.color, background: sc.bg, border: `1px solid ${sc.border}`,
          }}>
            {sc.icon} {sc.label}
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', minWidth: 72, textAlign: 'right' }}>
            {fmt(fee.totalFee)}
          </span>
          <ExpandMoreIcon sx={{
            fontSize: 18, color: 'var(--text-muted)',
            transition: 'transform 0.3s',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }} />
        </div>
      </button>

      {/* Expanded details */}
      <div style={{ overflow: 'hidden', maxHeight: expanded ? '500px' : '0', transition: 'max-height 0.35s ease' }}>
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />

          {/* Two-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

            {/* LEFT COLUMN: Fee Breakdown as clean rows */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Breakdown</p>
              <div style={{ background: 'var(--bg-secondary, rgba(0,0,0,0.02))', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                {[
                  { label: 'Tuition Fee', value: fee.tuitionFee },
                  { label: 'Hostel Fee', value: fee.hostelFee },
                  { label: 'Exam Fee', value: fee.examFee },
                ].map((item, i) => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px',
                    borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{fmt(item.value)}</span>
                  </div>
                ))}
                {/* Total row */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', background: 'rgba(201,162,39,0.06)', borderTop: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>Total</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--primary)' }}>{fmt(fee.totalFee)}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Payment + Due info */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Payment Details</p>

              {/* Paid / Due inline */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.12)' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#059669', margin: 0, textTransform: 'uppercase' }}>Paid</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: '#059669', margin: '2px 0 0' }}>{fmt(fee.paidAmount)}</p>
                </div>
                <div style={{ padding: '10px 12px', borderRadius: 10, background: dueAmount > 0 ? 'rgba(220,38,38,0.06)' : 'rgba(5,150,105,0.06)', border: `1px solid ${dueAmount > 0 ? 'rgba(220,38,38,0.12)' : 'rgba(5,150,105,0.12)'}` }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: dueAmount > 0 ? '#dc2626' : '#059669', margin: 0, textTransform: 'uppercase' }}>Due</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: dueAmount > 0 ? '#dc2626' : '#059669', margin: '2px 0 0' }}>{fmt(dueAmount)}</p>
                </div>
              </div>

              {/* Due date + Fine in compact rows */}
              <div style={{ background: 'var(--bg-secondary, rgba(0,0,0,0.02))', borderRadius: 10, border: '1px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                  <CalendarTodayIcon sx={{ fontSize: 13, color: 'var(--primary)' }} />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>Due Date</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{fmtDate(fee.dueDate)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                  <WarningAmberIcon sx={{ fontSize: 13, color: '#d97706' }} />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>Late Fine</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{fmt(fee.finePerDay)}/day</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px' }}>
                  <ErrorOutlineIcon sx={{ fontSize: 13, color: 'var(--text-muted)' }} />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>Max Fine</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{fmt(fee.maxFine)}</span>
                </div>
              </div>

              {/* Active fine warning */}
              {currentFine > 0 && (
                <div style={{
                  marginTop: 10, padding: '8px 12px', borderRadius: 8,
                  background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.12)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <WarningAmberIcon sx={{ fontSize: 14, color: '#dc2626' }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#dc2626' }}>
                    Current fine: {fmt(currentFine)} ({daysOverdue} days overdue)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Transaction ID (if paid) — full width */}
          {fee.paidOn && (
            <div style={{
              marginTop: 12, padding: '8px 14px', borderRadius: 8,
              background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.1)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <CheckCircleIcon sx={{ fontSize: 14, color: '#059669' }} />
              <span style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>
                Paid on {fmtDate(fee.paidOn)} · TXN: {fee.transactionId}
              </span>
              {fee.lateFine > 0 && (
                <span style={{ fontSize: 11, color: '#d97706', fontWeight: 600, marginLeft: 'auto' }}>
                  Late fine: {fmt(fee.lateFine)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function FeeStructure() {
  const { user } = useAuth();
  const course = detectCourse(user?.department);
  const totalSemesters = COURSE_SEMESTERS[course] || 8;
  const feeData = generateFeeData(totalSemesters);

  return (
    <div style={{ background: 'var(--primary-bg)' }} className="min-h-full">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
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

      <SummaryCards data={feeData} />

      {/* Semester list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {feeData.map((fee) => (
          <SemesterRow key={fee.semester} fee={fee} />
        ))}
      </div>
    </div>
  );
}
