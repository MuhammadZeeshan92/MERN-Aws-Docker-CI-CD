import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './ProfilePage.css';

const ProfilePage = () => {
  const { isAuthenticated, user } = useAuth();
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
    <div className="profile-page">
      <Navbar variant="dashboard" />
      <div className="container">
        <h1>Profile</h1>
        <div className="profile-content">
          <div className="profile-card">
            <h2>User Information</h2>
            <div className="profile-info">
              <div className="info-row">
                <span className="label">Name:</span>
                <span className="value">{user?.name || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{user?.email || 'N/A'}</span>
              </div>
            </div>
            <button className="btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

