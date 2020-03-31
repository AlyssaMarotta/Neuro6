import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './AppointmentPageComp.css';
import ConfirmCancel from '../ConfirmCancel/ConfirmCancel'
import { Input } from 'antd';
import Map from '../../components/Map/Map.js';


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
          <Map />
          <Input onClick = {togglePopup} value = "Cancel Appointment"/>
          {showPopup ?
            <ConfirmCancel
              text= {title}
              closePopup={togglePopup}
            />
            : null
          }
          <p>
          <Link to={'/RescheduleAppointment'}>
            <Input value = "Reschedule Appointment"/>  
          </Link>
          
          </p>
        </div>
  );
};
export default AppointmentPageComponent;