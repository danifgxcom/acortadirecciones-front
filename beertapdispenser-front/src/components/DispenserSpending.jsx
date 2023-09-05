import React, { useState } from 'react';
import api from '../services/api';

function DispenserSpending() {
    const [id, setId] = useState("");
    const [statistics, setStatistics] = useState(null);

    const getStatistics = async () => {
        try {
            const res = await api.get(`/dispenser/${id}/spending`);
            setStatistics(res.data);
            console.log("Statistics fetched:", res.data);
        } catch (err) {
            console.error("Error fetching statistics:", err);
        }
    };

    return (
        <div>
            <h2>Dispenser Spending</h2>
            <input placeholder="Dispenser ID" onChange={e => setId(e.target.value)} />
            <button onClick={getStatistics}>Get Statistics</button>
            {statistics && (
                <div>
                    <p>Total amount: {statistics.amount}</p>
                    <p>Usages: {JSON.stringify(statistics.usages)}</p>
                </div>
            )}
        </div>
    );
}

export default DispenserSpending;
