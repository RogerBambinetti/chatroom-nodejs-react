import React, { useEffect, useState, useMemo } from 'react';
import socketio from 'socket.io-client';

import api from '../services/api';

import Message from '../components/Message';

import SendIcon from '../assets/sendIcon.png';
import LogoutIcon from '../assets/logoutIcon.png';

import './Chat.css';

export default function Chat({ location, history }) {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [participant, setParticipant] = useState('');
    const [participantName, setParticipantName] = useState('');

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { participant }
    }), [participant]);

    useEffect(() => {
        if (!location.state) {
            history.push('/');
        } else {
            setParticipant(localStorage.getItem(location.state.name));
            setParticipantName((location.state.name)[0].toUpperCase() + location.state.name.slice(1));
        }
    }, [history, location.state]);

    useEffect(() => {
        socket.on('message', message => {
            console.log('passoy');
            setMessages(messages => [...messages, message]);
            window.scrollTo(0, document.body.scrollHeight);
        });

    },[]);

    useEffect(() => {
        async function loadMessages() {
            const response = await api.get('/message');
            setMessages(response.data);
            window.scrollTo(0, document.body.scrollHeight);
        }

        loadMessages();
    },[]);

    function handleInput(e) {
        e.preventDefault();
        if (input) {
            const message = { participant, participantName, text: input, createdAt: new Date() };
            socket.emit('sendMessage', message);
            setInput('');
            api.post('/message', message);
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
            <div className="chat-bar">
                <img src={LogoutIcon} alt="logoutIcon" onClick={handleLogout} />
                <h4>{participantName}</h4>
            </div>
            <div className="chat-container">
                <div id="messages-container" className="messages-container">
                    {messages.map((message, index) => {
                        return (
                            <Message index={index} message={message} participant={participant} />
                        )
                    })
                    }
                </div>
                <div className="input-container">
                    <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={event => event.key === 'Enter' ? handleInput(event) : null} name="input" id="input" />
                    <button type="submit" onClick={handleInput}>
                        <img src={SendIcon} alt="sendIcon" />
                    </button>
                </div>
            </div>
        </>
    );

}