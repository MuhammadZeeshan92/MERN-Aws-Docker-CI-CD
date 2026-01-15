import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './ProfilePage.css';

const ProfilePage = () => {
  const { authenticated,loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/login');
    }
  }, [authenticated, loading, navigate]);

  if (loading) return null;  

  if (!authenticated) {
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
                <span className="value">{user?.username || 'N/A'}</span>
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

