import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Appointment.css';
import { Input, Card } from 'antd';

const Appointment = (props) => {
  const { patientEmail, title, time, location, reminders } = props.data;

  return (
    <Card>
    <div className='Appointment'>
      <div className='all'>
        <div className='leftAppointment'>
          <p>{title}</p>
          <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
        </div>
        <div className='rights'>
        <Link to={'/Appointment/'+ props.id}>
          <Input value = "More Details"/>
        </Link>
        </div>
      </div>
    </div>
    </Card>
  );
};
export default Appointment;
