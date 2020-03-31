
import React, { useState, useEffect } from 'react';
import './NewAppointment.css';
import { Calendar, Select, Button, Input } from 'antd';
import moment from 'moment';

const NewAppointment = (props) => {
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


const [formData, setFormData] = useState(initForm);
const [date, setDate] = useState(moment('2018-03-25'));
const [appointments, setAppointments] = useState([]);
const { Option } = Select;


const UpdateDate = e => 
{
  console.log(new Date());
  setDate(e.format('MM-DD-YYYY'));
}
const onPanelChange = value => {
  setDate({ value });
};

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleFormTimeChange = e => {
    const { value } = e;
    {console.log(date +" " + value + " GMT-0400 (Eastern Daylight Time)");}
    setFormData(formData => ({
      ...formData,
      ['time']: new Date()//date +" " + value + " GMT-0400 (Eastern Daylight Time)",
      
    }));console.log(formData);
  };



  const handleAddAppointment = (appointment) => {
    const addAppointment = async () => {
      // const response = await fetch(`/appointments/${encodeURIComponent(email)}`, {
      const response = await fetch('/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment),
      });
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.error);
        
      }
    };
    console.log("4");
    addAppointment().catch(err => console.log(err));
  };

  return (
    <div className='App'>
        <header className='App-header'>
          Schedule a New Appointment
          <div className="NewAppointment">
              <Calendar 
                onSelect={UpdateDate}
                fullscreen={false}
                onPanelChange={onPanelChange}
              />
              <p>  <Select
                    labelInValue
                    placeholder = {'Select A Time'}
                    defaultValue={{ key: '0:00' }}
                    style={{ width: 120 }}
                    onChange={handleFormTimeChange}
                  >
                    <Option value="01:30:00">1:30</Option>
                    <Option value="04:00:00">4:00</Option>
                    <Option value="05:00:00">5:00</Option>
                  </Select></p>
                  <Input  
                    name='title'
                    className='textbox' 
                    placeholder="Reason for Appointment" 
                    required
                    onChange={handleFormChange}
                  />
              <p><Button onClick={handleAddAppointment(initForm)}>Submit</Button></p>
              <p>Or click here to call</p>
          </div>
        </header>
    </div>
  );
}

export default NewAppointment;