import React, { useEffect, useState, useMemo } from 'react';
import useForceUpdate from 'use-force-update';

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

    return (
        <>
            <div className="dashboard-bar">
                <img src={LogoutIcon} alt="logoutIcon" onClick={handleLogout} />
                <h4>{adminName}</h4>
            </div>
            <div className="dashboard-container">
                <aside className="dashboard-panel">
                    <div className="panel-item" onClick={handleSwitchOrder}>
                        <div className="panel-item-icon">
                            <img src={SwitchIcon} alt="switchIcon" />
                        </div>
                        <label>Inverter listagem</label>
                    </div>
                    <div className="panel-item">
                        <div className="panel-item-icon">
                            <img src={SearchIcon} alt="searchIcon" />
                        </div>
                        <label>Filtrar por username</label>
                    </div>
                    <div className="panel-item">
                        <div className="panel-item-icon">
                            <img src={DateIcon} alt="dateIcon" />
                        </div>
                        <label>Filtrar por data</label>
                    </div>
                </aside>
                <div id="messages-container" className="messages-container">
                    {messages.map((message, index) => {
                        return ([
                            <button type="button" className="message-delete">
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