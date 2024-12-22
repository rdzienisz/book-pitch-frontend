// src/components/PitchList.js

import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { getPitches } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PitchList = () => {
    const [pitches, setPitches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPitches().then(response => setPitches(response.data));
    }, []);

    return (
        <div>
            <h2>Available Pitches</h2>
            <List>
                {pitches.map(pitch => (
                    <ListItem
                        button
                        key={pitch.id}
                        onClick={() => navigate(`/pitches/${pitch.id}`)} // Navigate to PitchDetails
                    >
                        <ListItemText primary={pitch.name} secondary={pitch.description} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default PitchList;