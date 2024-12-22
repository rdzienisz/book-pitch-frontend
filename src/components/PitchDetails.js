// src/components/PitchDetails.js

import React from 'react';
import { useParams } from 'react-router-dom';
import AvailabilityChecker from './AvailabilityChecker';

const PitchDetails = () => {
    const { pitchId } = useParams(); // Get pitchId from route parameters

    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    return (
        <div>
            <h2>Pitch Details</h2>
            <AvailabilityChecker pitchId={pitchId} defaultDate={today} />
        </div>
    );
};

export default PitchDetails;