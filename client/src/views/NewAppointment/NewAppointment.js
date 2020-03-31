import React from 'react';
import './NewAppointment.css';
import ReactCalendar from 'react-calendar';


const NewAppointment = () => {
  return (
    <div className='App'>
        <header className='App-header'>
          Schedule a New Appointment
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

export default NewAppointment;