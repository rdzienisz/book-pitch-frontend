// src/components/AvailableSlotsTable.js

import React, { useState, useEffect } from 'react';
import {
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

const AvailableSlotsTable = ({ pitchId, date, onSelectSlots }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedSlots, setSelectedSlots] = useState([]);

    useEffect(() => {
        if (date) {
            setLoading(true);
            setError('');
            checkAvailability(pitchId, date)
                .then((response) => setSlots(response.data))
                .catch((err) => {
                    console.error(err);
                    setError('Error fetching data');
                })
                .finally(() => setLoading(false));
        }
    }, [pitchId, date]);

    const handleSlotClick = (slotStart) => {
        setSelectedSlots((prevSelectedSlots) => {
            const isSelected = prevSelectedSlots.includes(slotStart);
            const newSelectedSlots = isSelected
                ? prevSelectedSlots.filter((start) => start !== slotStart)
                : [...prevSelectedSlots, slotStart];

            // Notify parent component of the selected slots
            onSelectSlots(newSelectedSlots);

            return newSelectedSlots;
        });

        // Scroll to the bottom of the page
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Available Slots
            </Typography>

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
                            {slots.map((slot, index) => {
                                const isSelected = selectedSlots.includes(slot.start);
                                return (
                                    <TableRow
                                        key={index}
                                        style={{
                                            backgroundColor: isSelected ? 'blue' : 'lightgreen',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleSlotClick(slot.start)}
                                    >
                                        <TableCell>{slot.start}</TableCell>
                                        <TableCell>{slot.end}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default AvailableSlotsTable;