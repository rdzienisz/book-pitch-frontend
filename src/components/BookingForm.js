import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createBooking } from '../services/api';

const   BookingForm = ({ pitchId }) => {
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState(1);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startTime = `${date}T${time}`;
        const durationHours = parseInt(duration, 10);

        try {
            await createBooking(pitchId, email, startTime, durationHours);
            alert('Booking successful!');
        } catch (err) {
            console.error('Error creating booking:', err);
            setError(err.response?.data || 'An unexpected error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <h3>Create Booking</h3>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Duration (hours)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputProps={{ inputProps: { min: 1, max: 14 } }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '10px' }}
            >
                Book
            </Button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </form>
    );
};

export default BookingForm;