import React from 'react';

import './Message.css';

export default function Message(props) {

    const date = new Date(props.message.createdAt);

    return (
        props.message.participant === props.participant ? (
            <div key={props.index} className="sended-message-container">
                <div className="sended-message">
                    <p className="message-details">{date.getDay() - 1}/{date.getMonth() + 1}/{date.getFullYear()} - <b>{props.message.participantName}</b> - {date.getHours()}:{date.getMinutes()}</p>
                    <p>{props.message.text}</p>
                </div>
            </div>
        ) : (
                <div key={props.index} className="received-message-container">
                    <div className="received-message">
                    <p className="message-details">{date.getDay() - 1}/{date.getMonth() + 1}/{date.getFullYear()} - <b>{props.message.participantName}</b> - {date.getHours()}:{date.getMinutes()}</p>
                    <p>{props.message.text}</p>
                    </div>
                </div>
            )

    )
}