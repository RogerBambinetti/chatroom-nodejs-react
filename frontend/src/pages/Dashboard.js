import React, { useEffect, useState } from 'react';

import api from '../services/api';

import Message from '../components/Message';

import DateIcon from '../assets/dateIcon.png';
import LogoutIcon from '../assets/logoutIcon.png';
import SearchIcon from '../assets/searchIcon.png';
import SwitchIcon from '../assets/switchIcon.png';

import './Dashboard.css';

export default function Dashboard({ location, history }) {

    const [messages, setMessages] = useState([]);
    const [admin, setAdmin] = useState('');
    const [adminName, setAdminName] = useState('');
    const [switched, setSwitched] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [nameInput, setNameInput] = useState('');

    useEffect(() => {
        if (!location.state) {
            history.push('/adminLogin');
        } else {
            setAdmin(localStorage.getItem(location.state.name));
            setAdminName((location.state.name)[0].toUpperCase() + location.state.name.slice(1));
        }
    }, [history, location.state]);

    useEffect(() => {
        async function loadMessages() {
            const response = await api.get('/message');
            setMessages(response.data);
        }

        loadMessages();
    }, []);

    function handleLogout() {
        localStorage.clear();
        history.push('/adminLogin');
    }

    function handleSwitchOrder() {
        const switchedMessages = messages.reverse();
        setMessages(switchedMessages);
        setSwitched(switched ? false : true);
    }

    async function handleDateFilter() {
        if (dateInput) {
            const response = await api.get('/message/dateFilter', { params: { date: dateInput } });
            setMessages(response.data);
        }
    }

    async function handleNameFilter() {
        if (nameInput) {
            const response = await api.get('/message/nameFilter', { params: { name: nameInput } });
            setMessages(response.data);
        }
    }

    async function handleDelete(id) {
        if (window.confirm('Você realmente quer deletar essa mensagem?')) {
            const response = await api.delete('message', { params: { id }});
            setMessages(response.data);
        }
    }

    return (
        <>
            <div className="dashboard-bar">
                <img src={LogoutIcon} alt="logoutIcon" onClick={handleLogout} />
                <h4>{adminName}</h4>
            </div>
            <div className="dashboard-container">
                <aside className="dashboard-panel">
                    <div className="panel-item">
                        <div className="panel-item-icon" onClick={handleSwitchOrder}>
                            <img src={SwitchIcon} alt="switchIcon" />
                        </div>
                        <label>Inverter listagem</label>
                    </div>
                    <div className="panel-item">
                        <div className="panel-item-icon" onClick={handleNameFilter}>
                            <img src={SearchIcon} alt="searchIcon" />
                        </div>
                        <label>Filtrar por username:</label>
                        <input type="text" value={nameInput} onChange={e => setNameInput(e.target.value)} />
                    </div>
                    <div className="panel-item">
                        <div className="panel-item-icon" onClick={handleDateFilter}>
                            <img src={DateIcon} alt="dateIcon" />
                        </div>
                        <label>Filtrar por data:</label>
                        <input type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} />
                    </div>
                </aside>
                <div id="messages-container" className="messages-container">
                    {messages.map((message, index) => {
                        return ([
                            <button type="button" className="message-delete" onClick={() => handleDelete(message._id)}>
                                <label>Excluir</label>
                            </button>,
                            <Message index={index} message={message} admin={admin} />
                        ])
                    })
                    }
                </div>
            </div>
        </>
    );

}