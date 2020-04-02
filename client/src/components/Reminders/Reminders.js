import React from 'react';
import { Link } from 'react-router-dom';
import './Reminders.css';
import Reminder from '../Reminder/Reminder';
import { Input, Card, Alert } from 'antd';
// TODO: Fetch reminders based on user context
const Reminders = () => {
  return (
    // <div className='Reminders'>
      <div>
      {/* Reminders */}
      <Reminder>Be on time</Reminder>
      <p>{'\n'}</p>
      <Reminder>Fast the night before</Reminder>
    </div>
        //   <Alert style ={{margin: 10}}
        //   message="Reminder"
        //   description="Be on time for your meeting tomorrow"
        //   type="error"
        // />
  );
};
export default Reminders;
