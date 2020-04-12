import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './AppointmentPageComp.css';
import ConfirmCancel from '../ConfirmCancel/ConfirmCancel';
import { Input } from 'antd';
import Map from '../../components/Map/Map.js';
import { Card } from 'antd';


const AppointmentPageComponent = (props) => {
  const { patientEmail, title, time, location, reminders, _id } = props.data
  const [showPopup, setPopup] = useState(false);


  const togglePopup = e => {
    setPopup(!showPopup);
  }
  return (
    
          <Card style = {{margin : 20, width : "80%"}}>
          <p>{title}</p>
          <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
          <p>{reminders}</p>
          <p>{location}</p>
          <div className = "map">
            <Map/>
          </div>
          <Input onClick = {togglePopup} value = "Cancel Appointment"/>
          {showPopup ?
            <ConfirmCancel
              text= {title}
              closePopup={togglePopup}
              data= {props.data}
            />
            : null
          }
          <p>
          <Link to={'/RescheduleAppointment'}>
            <Input value = "Reschedule Appointment"/>  
          </Link>
          
          </p>
          </Card>
  );
};
export default AppointmentPageComponent;