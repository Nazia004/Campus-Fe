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

// ── Static fee data (semester-wise) ──────────────────────────────────────────
const FEE_DATA = [
  {
    semester: 'Semester 1',
    session: '2023–24 (Odd)',
    tuitionFee: 45000,
    examFee: 3000,
    labFee: 5000,
    libraryFee: 2000,
    totalFee: 55000,
    paidAmount: 55000,
    dueDate: '2023-08-15',
    finePerDay: 50,
    maxFine: 2500,
    paidOn: '2023-08-10',
    transactionId: 'TXN20230810A1',
    status: 'paid',
  },
  {
    semester: 'Semester 2',
    session: '2023–24 (Even)',
    tuitionFee: 45000,
    examFee: 3000,
    labFee: 5000,
    libraryFee: 2000,
    totalFee: 55000,
    paidAmount: 55000,
    dueDate: '2024-01-20',
    finePerDay: 50,
    maxFine: 2500,
    paidOn: '2024-01-18',
    transactionId: 'TXN20240118B2',
    status: 'paid',
  },
  {
    semester: 'Semester 3',
    session: '2024–25 (Odd)',
    tuitionFee: 48000,
    examFee: 3500,
    labFee: 5500,
    libraryFee: 2000,
    totalFee: 59000,
    paidAmount: 59000,
    dueDate: '2024-08-15',
    finePerDay: 50,
    maxFine: 3000,
    paidOn: '2024-08-20',
    lateFine: 250,
    transactionId: 'TXN20240820C3',
    status: 'paid',
  },
  {
    semester: 'Semester 4',
    session: '2024–25 (Even)',
    tuitionFee: 48000,
    examFee: 3500,
    labFee: 5500,
    libraryFee: 2000,
    totalFee: 59000,
    paidAmount: 30000,
    dueDate: '2025-01-25',
    finePerDay: 50,
    maxFine: 3000,
    status: 'partial',
  },
  {
    semester: 'Semester 5',
    session: '2025–26 (Odd)',
    tuitionFee: 50000,
    examFee: 4000,
    labFee: 6000,
    libraryFee: 2500,
    totalFee: 62500,
    paidAmount: 0,
    dueDate: '2025-08-15',
    finePerDay: 75,
    maxFine: 3750,
    status: 'unpaid',
  },
];

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
  const totalFine = data.reduce((s, d) => {
    if (d.status !== 'paid' && getDaysOverdue(d.dueDate) > 0) {
      return s + Math.min(getDaysOverdue(d.dueDate) * d.finePerDay, d.maxFine);
    }
    return s + (d.lateFine || 0);
  }, 0);

  const cards = [
    { label: 'Total Fees', value: formatCurrency(totalFees), icon: <ReceiptLongIcon sx={{ fontSize: 22 }} />, gradient: 'linear-gradient(135deg, #C9A227, #A67C00)' },
    { label: 'Total Paid', value: formatCurrency(totalPaid), icon: <CheckCircleIcon sx={{ fontSize: 22 }} />, gradient: 'linear-gradient(135deg, #059669, #047857)' },
    { label: 'Outstanding Due', value: formatCurrency(totalDue), icon: <CurrencyRupeeIcon sx={{ fontSize: 22 }} />, gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)' },
    { label: 'Fine Accrued', value: formatCurrency(totalFine), icon: <WarningAmberIcon sx={{ fontSize: 22 }} />, gradient: 'linear-gradient(135deg, #d97706, #b45309)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
              {[
                { label: 'Tuition Fee', value: fee.tuitionFee },
                { label: 'Exam Fee', value: fee.examFee },
                { label: 'Lab Fee', value: fee.labFee },
                { label: 'Library Fee', value: fee.libraryFee },
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
              Semester-wise fee details for {user?.name || 'Student'}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards data={FEE_DATA} />

      {/* Semester-wise Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {FEE_DATA.map((fee) => (
          <SemesterCard key={fee.semester} fee={fee} />
        ))}
      </div>
    </div>
  );
}
