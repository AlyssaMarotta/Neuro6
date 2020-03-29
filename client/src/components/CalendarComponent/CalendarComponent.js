import React from 'react';
import { Link } from 'react-router-dom';
import './CalendarComponent.css';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'antd';
import 'antd/dist/antd.dark.css';
import { Input } from 'antd';

const CalendarComponent = (props) => {

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  return (
    
    <div className='CalendarComponent'>
      <div className="site-calendar-demo-card">
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>
      <ReactCalendar />

      <p></p>
      <p></p>
      <Link to='/NewAppointment'>
        <Input value = "Schedule an Appointment"/>
      </Link>
    </div>
  );
};
export default CalendarComponent;
