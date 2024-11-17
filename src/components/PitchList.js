// src/components/PitchList.js

import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { getPitches } from '../services/api';

const PitchList = ({ onSelect }) => {
    const [pitches, setPitches] = useState([]);

    useEffect(() => {
        getPitches().then(response => setPitches(response.data));
    }, []);

    return (
        <div>
            <h2>Available Pitches</h2>
            <List>
                {pitches.map(pitch => (
                    <ListItem button key={pitch.id} onClick={() => onSelect(pitch.id)}>
                        <ListItemText primary={pitch.name} secondary={pitch.description} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default PitchList;