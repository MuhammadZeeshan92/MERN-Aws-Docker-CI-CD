import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = ({ variant = 'public', searchQuery, onSearchChange }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
              <button className="user-menu-btn">
                {user?.name || 'User'} ▼
              </button>
              <div className="dropdown-menu">
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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/#about">About</Link></li>
          <li><Link to="/#products">Products</Link></li>
          <li><Link to="/#contact">Contact</Link></li>
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

