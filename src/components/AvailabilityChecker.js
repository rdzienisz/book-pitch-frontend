import React, { useState } from 'react';
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

const AvailabilityChecker = ({ pitchId }) => {
    const [date, setDate] = useState('');
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheck = () => {
        if (!date) {
            setError('Please select a date');
            return;
        }

        setLoading(true);
        setError('');
        checkAvailability(pitchId, date)
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
                onClick={handleCheck}
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