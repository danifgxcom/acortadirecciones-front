import React, { useState } from 'react';
import api from '../services/api';

function DispenserStatus() {
    const [id, setId] = useState("");
    const [status, setStatus] = useState("");

    const changeStatus = async () => {
        try {
            await api.put(`/dispenser/${id}/status`, {
                status,
                updated_at: new Date().toISOString()
            });
            console.log("Status changed successfully");
        } catch (err) {
            console.error("Error changing status:", err);
        }
    };

    return (
        <div>
            <h2>Change Dispenser Status</h2>
            <input placeholder="Dispenser ID" onChange={e => setId(e.target.value)} />
            <select onChange={e => setStatus(e.target.value)}>
                <option value="" disabled selected>Select status</option>
                <option value="open">Open</option>
                <option value="close">Close</option>
            </select>
            <button onClick={changeStatus}>Change Status</button>
        </div>
    );
}

export default DispenserStatus;
