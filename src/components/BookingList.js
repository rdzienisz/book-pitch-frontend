import React, { useEffect, useState } from 'react';
import { getAllBookings, deleteBooking } from '../services/api';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Helper function to convert date arrays to Date objects
const convertToDate = (dateArray) => {
    // Note: Month is 0-indexed in JavaScript Date object
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
};

const BookingList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await getAllBookings();
            // Convert startTime and endTime from arrays to Date objects
            const bookingsWithDates = response.data.map(booking => ({
                ...booking,
                startTime: convertToDate(booking.startTime),
                endTime: convertToDate(booking.endTime),
            }));
            setBookings(bookingsWithDates);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            await deleteBooking(bookingId);
            fetchBookings(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Pitch</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>{booking.id}</TableCell>
                            <TableCell>{booking.userEmail}</TableCell>
                            <TableCell>{booking.pitch.name}</TableCell>
                            <TableCell>{booking.startTime.toLocaleString()}</TableCell>
                            <TableCell>{booking.endTime.toLocaleString()}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleCancelBooking(booking.id)}
                                >
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BookingList;