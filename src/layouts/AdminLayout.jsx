import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#4C1D95 100%)', backgroundAttachment: 'fixed' }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: 'auto', background: 'transparent' }}>
        <Outlet />
      </main>
    </div>
  );
}
