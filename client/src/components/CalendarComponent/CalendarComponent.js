import React from 'react';
import { Link } from 'react-router-dom';
import './CalendarComponent.css';
import { Calendar } from 'antd';
import 'antd/dist/antd.dark.css';
import { Input } from 'antd';

const CalendarComponent = () => {

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  return (
    
    <div className='CalendarComponent'>
      <div className="site-calendar-demo-card">
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>
      <Link to='/NewAppointment'>
        <Input value = "Schedule an Appointment"/>
      </Link>
    </div>
  );
};
export default CalendarComponent;
