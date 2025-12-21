import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './OrdersPage.css';

const OrdersPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="orders-page">
      <Navbar variant="dashboard" />
      <div className="container">
        <h1>My Orders</h1>
        <div className="orders-content">
          <div className="empty-state">
            <p>You haven't placed any orders yet.</p>
            <Link to="/dashboard" className="btn-primary">Start Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

