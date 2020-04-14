import React from 'react';
import { Link } from 'react-router-dom';
import './Reminders.css';
import Reminder from '../Reminder/Reminder';
import { Input, Card, Alert } from 'antd';
// TODO: Fetch reminders based on user context
const Reminders = (props) => {
  console.log(props.reminder);
  return (
    // <div className='Reminders'>
      <div>
      {/* Reminders */}
        {props.reminder && props.reminder.map((reminder, index) => (
      <Reminder reminder = {reminder}/>
      ))}
    </div>
        //   <Alert style ={{margin: 10}}
        //   message="Reminder"
        //   description="Be on time for your meeting tomorrow"
        //   type="error"
        // />
  );
};
export default Reminders;
