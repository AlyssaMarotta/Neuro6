import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RescheduleAppointment.css';
import { Calendar, Select, Button, Input } from 'antd';
import ReactCalendar from 'react-calendar';


const Reschedule = (props) => {

  console.count(props.email);
  const email = props.email;
  const initForm = {
    
    patientEmail: email,
    title: '',
    time: new Date(),
    location: ' 1505 SW Archer Road Gainesville, FL 32608',
    reminders: [
      'Bring your best smile!',
      'Remember to floss'
    ]
  };

  var d = new Date(); 

  const [formData, setFormData] = useState(initForm);
  const { Option } = Select;
  const [submitted, setSubmitted] = useState(false);

  const UpdateDate = e => 
  {
  
    d.setFullYear(e.format('YYYY'));
    d.setDate(e.format('DD'));
    d.setMonth(e.format('MM')-1);
    console.log(d);
  }

  const handleFormTimeChange = e => {

    const {value} = e;
    d.setHours(value.substring(0,2))
    d.setMinutes(value.substring(3,5))
    console.log(d);
    setFormData(formData => ({
      ...formData,
      ['time']: d//new date(date + " " + value)//date +" " + value + " GMT-0400 (Eastern Daylight Time)",
      
    }));console.log(formData);
  };

  const onPanelChange = value => {
    UpdateDate(value);
  };

  return (
    <div className='App'>
        <header className='App-header'>
        Reschedule Appointment
          <div className="NewAppointment">
              <Calendar 
                fullscreen={false}
                onPanelChange={onPanelChange}
              />
            <Select
              labelInValue
              placeholder = {'Select A Time'}
              defaultValue={{ key: '0:00' }}
              style={{ width: 120 }}
              onChange={handleFormTimeChange}
            >
              <Option value="01:30:00" hour = "13" minute = "30" >1:30</Option>
                    <Option value="04:00:00" hour = "16" minute = "00">4:00</Option>
                    <Option value="05:00:00" hour = "17" minute = "00">5:00</Option>
                  </Select>
            <p><Input value = "submit"/></p>
            <p>Or click here to call</p>
            
          </div>
        </header>
    </div>
  );
}
export default Reschedule;