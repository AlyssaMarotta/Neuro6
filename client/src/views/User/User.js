import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import Reminders from '../../components/Reminders/Reminders';
import Appointments from '../../components/Appointments/Appointments';

function User() {
    return (
    <div className="App">
    <header className="App-header">  
        <Reminders />
        <Appointments/>
    </header>
    
</div>
);
}

export default User;