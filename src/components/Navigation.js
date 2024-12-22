import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Navigation = () => {
    const { isAdmin, logout } = useAuth(); // Access isAdmin and logout from context
    const [logoutMessage, setLogoutMessage] = useState('');

    const handleLogout = () => {
        logout();
        setLogoutMessage('Logout successful!');
        setTimeout(() => setLogoutMessage(''), 3000); // Clear message after 3 seconds
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/pitches">Pitches</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                    <Button color="inherit" component={Link} to="/book">Book</Button>
                    {isAdmin && (
                        <>
                            <Button color="inherit" component={Link} to="/bookings">Booking List</Button>
                            <div style={{ flexGrow: 1 }} /> {/* This pushes the next button to the right */}
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
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