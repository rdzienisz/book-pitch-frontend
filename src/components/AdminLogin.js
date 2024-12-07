import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password,
            });

            // Assuming the server responds with a token on successful login
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token); // Store the token
                setMessage('Login successful!');
                // Optionally redirect or update authentication state
            } else {
                setMessage('Login failed: Token not received');
            }
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response && error.response.data) {
                setMessage(`Login failed: ${error.response.data.message}`);
            } else {
                setMessage('Login failed: Invalid username or password');
            }
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminLogin;