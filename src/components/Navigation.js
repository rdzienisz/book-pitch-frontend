import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const { isAdmin, logout } = useAuth();
    const [logoutMessage, setLogoutMessage] = useState('');

    const handleLogout = () => {
        logout();
        setLogoutMessage('Logout successful!');
        setTimeout(() => setLogoutMessage(''), 3000);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button id="home-button" color="inherit" component={Link} to="/">Home</Button>
                    <Button id="pitches-button" color="inherit" component={Link} to="/pitches">Pitches</Button>
                    <Button id="contact-button" color="inherit" component={Link} to="/contact">Contact</Button>
                    <Button id="book-button" color="inherit" component={Link} to="/book">Book</Button>
                    {isAdmin && (
                        <>
                            <Button id="booking-list-button" color="inherit" component={Link} to="/bookings">Booking List</Button>
                            <div style={{ flexGrow: 1 }} />
                            <Button id="logout-button" color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            {logoutMessage && (
                <Typography variant="body1" color="primary" align="center" style={{ marginTop: '10px' }}>
                    {logoutMessage}
                </Typography>
            )}
        </div>
    );
};

export default Navigation;