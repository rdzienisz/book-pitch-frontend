import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createBooking, getPitches } from '../services/api';
import AvailableSlotsTable from './AvailableSlotsTable';

const BookingForm = ({ pitchId: initialPitchId }) => {
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [error, setError] = useState('');
    const [pitchId, setPitchId] = useState(initialPitchId || '');
    const [pitches, setPitches] = useState([]);

    useEffect(() => {
        if (!initialPitchId) {
            getPitches().then((response) => setPitches(response.data));
        }
    }, [initialPitchId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pitchId) {
            setError('Please select a pitch');
            return;
        }
        if (selectedSlots.length === 0) {
            setError('Please select at least one start time');
            return;
        }

        try {
            for (let startTime of selectedSlots) {
                const formattedStartTime = `${date}T${startTime}`;
                await createBooking(pitchId, email, formattedStartTime, 1);
            }
            alert('Booking successful!');
        } catch (err) {
            console.error('Error creating booking:', err);
            setError(err.response?.data || 'An unexpected error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <h3>Create Booking</h3>

            {!initialPitchId && (
                <FormControl fullWidth margin="normal">
                    <InputLabel>Select Pitch</InputLabel>
                    <Select
                        id="pitch-select"
                        value={pitchId}
                        onChange={(e) => setPitchId(e.target.value)}
                        required
                    >
                        {pitches.map((pitch) => (
                            <MenuItem key={pitch.id} value={pitch.id}>
                                {pitch.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <TextField
                id="email-input"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                id="date-input"
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />

            <AvailableSlotsTable
                pitchId={pitchId}
                date={date}
                onSelectSlots={setSelectedSlots}
            />

            <TextField
                id="duration-input"
                label="Duration (hours)"
                type="number"
                value={selectedSlots.length}
                readOnly
                fullWidth
                margin="normal"
            />
            <Button
                id="create-booking-button"
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