// src/services/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Adjust based on your backend URL

export const getPitches = () => axios.get(`${API_BASE_URL}/user/pitches`);

export const checkAvailability = (pitchId, date) =>
    axios.get(`${API_BASE_URL}/user/availability/${pitchId}`, { params: { date } });

export const createBooking = async (pitchId, email, startTime, durationHours) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/bookings/${pitchId}`, {
            email,
            startTime,
            durationHours,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data; // Ensure this matches the data structure returned by your backend
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error; // Ensure the error is thrown so it can be caught in the form
    }
};