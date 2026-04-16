import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardByRole } from '../utils/roleUtils';

/**
 * PublicRoute: Guard for routes that should ONLY be accessible 
 * to unauthenticated users (like Landing or Login).
 * If a user is already logged in, it redirects them to their dashboard.
 */
export default function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    // Redirect already authenticated users to their specific dashboard
    return <Navigate to={getDashboardByRole(user.role)} replace />;
  }

  return children;
}
