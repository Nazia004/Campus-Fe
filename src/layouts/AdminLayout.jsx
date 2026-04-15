import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: 'auto', background: 'var(--bg)' }}>
        <Outlet />
      </main>
    </div>
  );
}
