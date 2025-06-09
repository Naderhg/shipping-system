import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to role-specific dashboard if authenticated but wrong role
    const dashboardRoutes = {
      admin: '/admin/dashboard',
      merchant: '/merchant/dashboard',
      courier: '/courier/dashboard'
    };
    return <Navigate to={dashboardRoutes[user.role]} replace />;
  }

  return children;
};

export default ProtectedRoute; 