import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    const checkAuth = async () => {
        try {
            const res = await api.get('/api/auth/me');
            setAuthenticated(true);
            
            setUser(res.data.user); 
        } catch (error) {
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
        } catch (error) {
            // ignore
        } finally {
            setAuthenticated(false);
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                isAuthenticated: authenticated, // Alias for consistency
                loading,
                checkAuth,
                logout,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
