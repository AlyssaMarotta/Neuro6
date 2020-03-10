import React from 'react';
import { Link } from 'react-router-dom';
import './Reminders.css';
import Reminder from '../Reminder/Reminder';

const Reminders = () => {
    return (
        <div className = "Reminders">
            Reminders
            <Reminder/>
            <Reminder/>
        </div>
    )
};
export default Reminders;