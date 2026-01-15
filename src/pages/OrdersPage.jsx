// src/pages/OrdersPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './OrdersPage.css';
import api from '../utils/axios';

const OrdersPage = () => {
  const { authenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/login');
    }
  }, [authenticated, loading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/api/orders/my-orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (authenticated) fetchOrders();
  }, [authenticated]);

  if (loading) return null;

  if (!authenticated) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="orders-page">
      <Navbar variant="dashboard" />
      <div className="container">
        <h1>My Orders</h1>
        <div className="orders-content">
          {loadingOrders ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h2>No Orders Yet</h2>
              <p>You haven't placed any orders yet.</p>
              <Link to="/dashboard" className="btn-primary">Start Shopping</Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order, index) => (
                <div key={order._id || order.id} className="order-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="order-header">
                    <div className="order-id-section">
                      <h3>Order #{order._id?.slice(-8) || order.id?.slice(-8) || 'N/A'}</h3>
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    <div className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="order-items-preview">
                      <h4>Items ({order.items.length})</h4>
                      <div className="items-grid">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="order-item-preview">
                            {item.image && (
                              <img src={item.image} alt={item.name} />
                            )}
                            <div className="item-details">
                              <p className="item-name">{item.name}</p>
                              <p className="item-quantity">Qty: {item.quantity}</p>
                            </div>
                            <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="more-items">
                            +{order.items.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
                    </div>
                    {order.shipping !== undefined && (
                      <div className="summary-row">
                        <span>Shipping:</span>
                        <span>${order.shipping?.toFixed(2) || '0.00'}</span>
                      </div>
                    )}
                    {order.tax !== undefined && (
                      <div className="summary-row">
                        <span>Tax:</span>
                        <span>${order.tax?.toFixed(2) || '0.00'}</span>
                      </div>
                    )}
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>${order.total?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>

                  {order.email && (
                    <div className="order-contact">
                      <p><strong>Contact:</strong> {order.email}</p>
                      {order.phone && <p><strong>Phone:</strong> {order.phone}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;