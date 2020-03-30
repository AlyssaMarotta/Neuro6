import React from 'react';
import { Link } from 'react-router-dom';
import './RescheduleAppointment.css';
import ReactCalendar from 'react-calendar';


const Reschedule = () => {
  return (
    <div className='App'>
        <header className='App-header'>
        Reschedule Appointment
          <div className="NewAppointment">
            <ReactCalendar/>
            <p><button className='buttons'>Drop down menu to select the dates</button></p>
            <p><button className='buttons'>submit</button></p>
            <p>Or click here to call</p>
            
          </div>
        </header>
    </div>
  );
}
export default Reschedule;