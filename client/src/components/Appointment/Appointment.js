import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Appointment.css';
import { Input } from 'antd';

const Appointment = (props) => {
  const { title, time, location, reminders } = props.data;

  return (
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
  );
};
export default Appointment;
