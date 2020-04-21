import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './AppointmentPageComp.css';
import ConfirmCancel from '../ConfirmCancel/ConfirmCancel';
import { Input } from 'antd';
import Map from '../../components/Map/Map.js';
import { Card } from 'antd';
import { Button } from 'antd';


const AppointmentPageComponent = (props) => {
  const { patientEmail, title, time, location, reminders, _id } = props.data
  const [showPopup, setPopup] = useState(false);


  const togglePopup = e => {
    setPopup(!showPopup);
  }
  return (
    
          <Card style = {{margin : 20, width : "80%"}}>
          <h2>{title}</h2>
          <h3>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</h3>
          <p><strong>Reminders:</strong></p>
          {reminders?.map((reminder, index) => (
            <p key={index}>{reminder}</p>
          ))}
          <p><em>{location}</em></p>
          <div className = "map">
            <Map/>
            <Button type="primary"
              onClick={() => {
                window.open('https://www.google.com/maps/dir//1505+SW+Archer+Rd,+Gainesville,+FL');
              }}
            >
              Open Directions in Google Maps
            </Button>
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