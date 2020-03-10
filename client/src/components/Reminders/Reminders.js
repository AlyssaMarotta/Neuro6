import React from 'react';
import { Link } from 'react-router-dom';
import './Reminders.css';
import Reminder from '../Reminder/Reminder';

// TODO: Fetch reminders based on user context
const Reminders = () => {
  return (
    <div className='Reminders'>
      Reminders
      <Reminder>Be on time</Reminder>
      <Reminder>Fast the night before</Reminder>
    </div>
  );
};
export default Reminders;
