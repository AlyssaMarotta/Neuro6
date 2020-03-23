import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './AppointmentPageComp.css';
import ConfirmCancel from '../ConfirmCancel/ConfirmCancel'

const AppointmentPageComponent = (props) => {
  const { patientEmail, title, time, location, reminders } = props.data
  const [showPopup, setPopup] = useState(false);


  const togglePopup = e => {
    setPopup(!showPopup);
  }
  return (
        <div className='AppointmentPage'>
          <p>{title}</p>
          <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
          <p>{reminders}</p>
          <p>{location}</p>
          <button className='buttons' onClick = {togglePopup}>Cancel Appointment</button>
          {showPopup ?
            <ConfirmCancel
              text= {title}
              closePopup={togglePopup}
            />
            : null
          }
          <p>
          <Link to={'/RescheduleAppointment'}>
            <button className='buttons'>Reschedule Appointment</button>
          </Link>
          
          </p>
        </div>
  );
};
export default AppointmentPageComponent;