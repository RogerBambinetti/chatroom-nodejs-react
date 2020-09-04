import React, { useState } from 'react';

import api from '../services/api';

import AdminLogo from '../assets/adminLogo.png';

import './AdminLogin.css';

export default function AdminLogin({ history }) {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        const response = await api.post('/adminLogin', { name, password });
        if (response.data.message) {
            alert(response.data.message);
        } else {
            localStorage.setItem(name, response.data._id);
            history.push('/dashboard', { name });
        }
    }

    return (
        <div className="login-container">
            <form action="">
                <img src={AdminLogo} alt="logo" />
                <label htmlFor="">Username</label>
                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="">Senha</label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={handleLogin}>Entrar</button>
            </form>
        </div>
    );

}