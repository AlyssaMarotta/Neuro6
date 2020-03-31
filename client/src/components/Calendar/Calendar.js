import React from 'react';
import { Link } from 'react-router-dom';
import './Calendar.css';
import ReactCalendar from 'react-calendar';

const Calendar = () => {
  return (
    <div className='Calendar'>
      <ReactCalendar />
      <p></p>
      <p></p>
      <Link to='/NewAppointment'>
        <button className='buttons'>Schedule an Appointment</button>
      </Link>
    </div>
  );
};
export default Calendar;
