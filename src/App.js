// src/App.js

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import PitchList from './components/PitchList';
import BookingForm from './components/BookingForm';
import AvailabilityChecker from './components/AvailabilityChecker';

const App = () => {
  const [selectedPitchId, setSelectedPitchId] = useState(null);

  return (
      <Container>
        <h1>Pitch Booking System</h1>
        <PitchList onSelect={setSelectedPitchId} />
        {selectedPitchId && (
            <>
              <BookingForm pitchId={selectedPitchId} />
              <AvailabilityChecker pitchId={selectedPitchId} />
            </>
        )}
      </Container>
  );
};

export default App;