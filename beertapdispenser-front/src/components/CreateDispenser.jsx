import React, { useState } from 'react';
import api from '../services/api';

function CreateDispenser() {
    const [flowVolume, setFlowVolume] = useState(0);

    const createDispenser = async () => {
        try {
            const res = await api.post('/dispenser', {
                flow_volume: flowVolume,
            });
            console.log("Dispenser created:", res.data);
        } catch (err) {
            console.error("Error creating dispenser:", err);
        }
    };

    return (
        <div>
            <h2>Create Dispenser</h2>
            <input placeholder="Flow Volume" type="number" onChange={e => setFlowVolume(parseFloat(e.target.value))} />
            <button onClick={createDispenser}>Create</button>
        </div>
    );
}

export default CreateDispenser;
