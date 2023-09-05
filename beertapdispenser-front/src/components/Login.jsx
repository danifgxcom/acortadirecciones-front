import React, { useState } from 'react';
import api from '../services/api';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const res = await axios.post('http://localhost:8080/tapbeerdispenser/api/login', { username, password });
            console.log("Logged in:", res.data);
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
        </div>
    );
};

export default Login;
