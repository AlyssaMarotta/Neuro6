import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Appointment.css';

const Appointment = (props) => {
  const { patientEmail, title, time, location, reminders } = props.data;

  return (
    <div className='Appointment'>
      <div className='all'>
        <div className='leftAppointment'>
          <p>{title}</p>
          <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
        </div>
        <div className='rights'>
          <Link to='#'>
            <button className='buttons'>More Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Appointment;
