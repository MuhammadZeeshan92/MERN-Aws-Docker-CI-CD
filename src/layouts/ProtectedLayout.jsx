import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedLayout = () => {
  const { authenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
