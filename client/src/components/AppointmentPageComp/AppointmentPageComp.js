import React from 'react';
import moment from 'moment';
import './AppointmentPageComp.css';

const AppointmentPageComponent = (props) => {
  const { patientEmail, title, time, location, reminders } = props.data;

  return (
        <div className='AppointmentPage'>
          <p>{title}</p>
          <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
          <p>{reminders}</p>
          <p>{location}</p>
          <button className='buttons' >Cancel Appointment</button>
          <p>
          <button className='buttons'>Reschedule Appointment</button>
          </p>
        </div>
  );
};
export default AppointmentPageComponent;