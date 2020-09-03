import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ParticipantLogin from './pages/ParticipantLogin';
import Chat from './pages/Chat';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/adminLogin" exact component={AdminLogin} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/" exact component={ParticipantLogin} />
                <Route path="/chat" exact component={Chat} />
            </Switch>
        </BrowserRouter>
    );

}