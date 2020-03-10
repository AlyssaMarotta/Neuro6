import React from 'react';
import { Link } from 'react-router-dom';
import './Reminder.css';

const Reminder = props => {
  const { children } = props;

  return (
    <div className='Reminder'>
      <p>{children}</p>
    </div>
  );
};
export default Reminder;
