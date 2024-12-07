// src/services/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Adjust based on your backend URL

// Function to get the JWT token from localStorage
const getToken = () => {
    return localStorage.getItem('token');
};

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        console.log("adding token", token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Define your API functions using the axios instance
export const getPitches = () => axiosInstance.get('/user/pitches');

export const checkAvailability = (pitchId, date) =>
    axiosInstance.get(`/user/availability/${pitchId}`, { params: { date } });

export const createBooking = async (pitchId, email, startTime, durationHours) => {
    try {
        const response = await axiosInstance.post(`/user/bookings/${pitchId}`, {
            email,
            startTime,
            durationHours,
        });
        return response.data; // Ensure this matches the data structure returned by your backend
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error; // Ensure the error is thrown so it can be caught in the form
    }
};

export const getAllBookings = () => axiosInstance.get('/admin/bookings');

export const deleteBooking = (bookingId) => axiosInstance.delete(`/admin/booking/${bookingId}`);