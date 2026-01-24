import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import api from '../utils/axios'
import './Navbar.css';

const Navbar = ({
  variant = 'public',
  searchQuery,
  onSearchChange,
  onHomeClick,
  onAboutClick,
  onProductsClick,
  onContactClick }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [show, setShow] = useState(false)
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();


  const handleDropDown = () => {
    setShow(!show)
  }

  const handleLogout = async () => {

      try {
        // 🔹 Clear JWT cookie on backend
        const res = await logout()
        console.log(res);
      } catch (error) {
        // ignore backend error
      } finally {
        // 🔹 Update frontend auth state
        // setAuthenticated(false);
      }
  };

  if (variant === 'dashboard') {
    return (
      <nav className="navbar navbar-dashboard">
        <div className="navbar-container">
          <Link to="/dashboard" className="navbar-logo">
            <img src={logo} alt="Quick Pick" />
          </Link>
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery || ''}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            <button type="button">🔍</button>
          </div>
          <div className="navbar-right">
            <Link to="/cart" className="cart-icon">
              🛒
              {getCartItemCount() > 0 && (
                <span className="cart-badge">{getCartItemCount()}</span>
              )}
            </Link>
            <div className="user-dropdown">
              <button onClick={handleDropDown} className="user-menu-btn">
                {user?.name || 'User'} ▼
              </button>
              <div className={`${show ? 'dropdown-menu' : 'hide-dropdown-menu'}`}>
                <Link to="/profile">Profile</Link>
                <Link to="/orders">Orders</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-public">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Quick Pick" />
        </Link>
        <ul className="navbar-menu">
          <li><button onClick={onHomeClick}>Home</button></li>
          <li><button onClick={onAboutClick}>About</button></li>
          <li><button onClick={onProductsClick}>Products</button></li>
          <li><button onClick={onContactClick}>Contact</button></li>
        </ul>

        <div className="navbar-right">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="cart-icon">
                🛒
                {getCartItemCount() > 0 && (
                  <span className="cart-badge">{getCartItemCount()}</span>
                )}
              </Link>
              <Link to="/dashboard" className="btn-secondary">Dashboard</Link>
            </>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

