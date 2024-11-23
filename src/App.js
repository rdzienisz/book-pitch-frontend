// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import PitchList from './components/PitchList';
import PitchDetails from './components/PitchDetails';
import BookingForm from "./components/BookingForm";

const App = () => {
    return (
        <Router>
            <Navigation />
            <Container>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/pitches" element={<PitchList />} />
                    <Route path="/pitches/:pitchId" element={<PitchDetails />} />
                    <Route path="/book" element={<BookingForm />} />
                    <Route path="/contact" element={<div>Contact Page</div>} />
                    <Route path="/prices" element={<div>Prices Page</div>} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;