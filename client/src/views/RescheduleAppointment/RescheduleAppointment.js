import React from 'react';
import { Link } from 'react-router-dom';
import './RescheduleAppointment.css';
import ReactCalendar from 'react-calendar';
import { Calendar, Input } from 'antd';


const Reschedule = () => {

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  return (
    <div className='App'>
        <header className='App-header'>
        Reschedule Appointment
          <div className="NewAppointment">
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            <p><Input value = "Drop down menu to select the dates"/></p>
            <p><Input value = "submit"/></p>
            <p>Or click here to call</p>
            
          </div>
        </header>
    </div>
  );
}
export default Reschedule;