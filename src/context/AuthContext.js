import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    const checkAdminStatus = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            setIsAdmin(false);
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const roles = decodedToken.roles || [];
            console.log(roles);
            setIsAdmin(roles.includes('ADMIN'));
            setIsAuthenticated(true);
            console.log("admin detected")
        } catch (error) {
            console.error('Failed to decode token:', error);
            setIsAuthenticated(false);
            setIsAdmin(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            checkAdminStatus();
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    useEffect(() => {
        checkAdminStatus();
    }, [location]);

    return (
        <AuthContext.Provider value={{ isAdmin, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};