// src/components/AvailabilityChecker.js

import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material';
import { checkAvailability } from '../services/api';

const AvailabilityChecker = ({ pitchId, defaultDate }) => {
    const [date, setDate] = useState(defaultDate || '');
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (date) {
            handleCheck(date);
        }
    }, [date]);

    const handleCheck = (selectedDate) => {
        setLoading(true);
        setError('');
        checkAvailability(pitchId, selectedDate)
            .then((response) => setSlots(response.data))
            .catch((err) => {
                console.error(err);
                setError('Error fetching data');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div style={{ marginTop: '20px', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Check Availability
            </Typography>
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleCheck(date)}
                fullWidth
                style={{ marginBottom: '20px' }}
            >
                Check
            </Button>

            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}

            {slots.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {slots.map((slot, index) => (
                                <TableRow key={index} style={{ backgroundColor: 'lightgreen' }}>
                                    <TableCell>{slot.start}</TableCell>
                                    <TableCell>{slot.end}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default AvailabilityChecker;