import React, { useState } from 'react';
import api from '../services/api';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const register = async () => {
    try {
      const res = await api.post('/register', { username, password, role });
      console.log("Registered:", res.data);
    } catch (err) {
      console.error("Error registering:", err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <input placeholder="Role" onChange={e => setRole(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
