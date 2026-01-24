// src/pages/CheckoutPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { authenticated, loading, user, token } = useAuth(); // user and token expected
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isUmtStudent: false,
  });

  if (loading) return null;

  useEffect(() => {
    if (!loading && !authenticated) navigate('/login');
    // Don't redirect if modal is showing (order was just placed)
    if (cartItems.length === 0 && !showModal && !loadingSubmit) navigate('/cart');
  // removed duplicate dependency and cleaned up
  }, [authenticated, loading, cartItems.length, navigate, showModal, loadingSubmit]);

  // autofill name/email when user becomes available
  useEffect(() => {
    if (user) {
      setFormData(f => ({ ...f, name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(), email: user.email || '' }));
    }
  }, [user]);

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const orderPayload = {
        userId: user?.id || user?._id || null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        isUmtStudent: formData.isUmtStudent,
        items: cartItems,
        subtotal: getCartTotal(),
        shipping: 10,
        tax: getCartTotal() * 0.1,
        total: getCartTotal() + 10 + getCartTotal() * 0.1,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Failed' }));
        throw new Error(err.message || 'Order failed');
      }

      // success - show modal first, then clear cart
      setShowModal(true);
      // Clear cart after a small delay to ensure modal renders
      setTimeout(() => {
        clearCart();
      }, 100);
    } catch (err) {
      console.error('Order error', err);
      alert('Could not place order: ' + err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/dashboard');
  };

  // Don't return null if modal is showing (order was just placed)
  if (!authenticated || (cartItems.length === 0 && !showModal)) return null;

  const subtotal = getCartTotal();
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <>
      {/* Order Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-confirmation-icon">✓</div>
            <h2>Order Confirmed!</h2>
            <p>Your order has been placed successfully.</p>
            <p>You will receive a confirmation email shortly.</p>
            <button className="btn-primary btn-large" onClick={handleModalClose}>
              OK
            </button>
          </div>
        </div>
      )}

      <div className="checkout-page">
        <Navbar variant="dashboard" />
        <div className="container">
          <h1>Checkout</h1>
          <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Shipping / Contact</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>
                  <input type="checkbox" name="isUmtStudent" checked={formData.isUmtStudent} onChange={handleInputChange} />
                  {' '}I am a UMT student
                </label>
              </div>

              <button type="submit" className="btn-primary btn-large" disabled={loadingSubmit}>
                {loadingSubmit ? 'Placing order...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="total-row"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="total-row"><span>Shipping:</span><span>${shipping.toFixed(2)}</span></div>
              <div className="total-row"><span>Tax:</span><span>${tax.toFixed(2)}</span></div>
              <div className="total-row final"><span>Total:</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
