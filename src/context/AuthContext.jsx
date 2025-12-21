import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('quickpick_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, this would be an API call
    // For demo purposes, accept any email/password
    const userData = {
      id: 1,
      name: email.split('@')[0],
      email: email,
    };
    setUser(userData);
    localStorage.setItem('quickpick_user', JSON.stringify(userData));
    return { success: true };
  };

  const signup = (name, email, password) => {
    // Mock signup - in real app, this would be an API call
    const userData = {
      id: Date.now(),
      name: name,
      email: email,
    };
    setUser(userData);
    localStorage.setItem('quickpick_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quickpick_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

