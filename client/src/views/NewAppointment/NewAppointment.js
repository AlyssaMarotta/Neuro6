
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './NewAppointment.css';
import { Calendar, Select, Button, Input, Card } from 'antd';
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
const onPanelChange = value => {
  UpdateDate(value);
};

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

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



  const handleAddAppointment = (appointment) => {
    console.log("Trying To Add appointment");
    const addAppointment = async () => {
      const response = await fetch('/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const body = await response.json();
      if (response.status !== 200) {
        console.log("Failed add Appointment");
        throw Error(body.error);
      }
      else {
        setSubmitted(true);
      }
    };
    addAppointment().catch(err => console.log(err));
  };
  if (submitted) return (
    <Redirect to= {"/user"} />
  );
  return (
    
    <div className='App'>
        <header className='App-header'>
          Schedule a New Appointment
          <div className="NewAppointment">
          <Card> 
          <Card>
              <Calendar 
                fullscreen={false}
                onPanelChange={onPanelChange}
              />
              </Card>
              <p>  <Select
                    labelInValue
                    placeholder = {'Select A Time'}
                    defaultValue={{ key: '0:00' }}
                    style={{ width: 120 }}
                    onChange={handleFormTimeChange}
                  >
                    <Option value="01:30:00" hour = "13" minute = "30" >1:30</Option>
                    <Option value="04:00:00" hour = "16" minute = "00">4:00</Option>
                    <Option value="05:00:00" hour = "17" minute = "00">5:00</Option>
                  </Select></p>
                  <Input  
                    name='title'
                    className='textbox' 
                    placeholder="Reason for Appointment" 
                    required
                    onChange={handleFormChange}
                  />
              <p><Button onClick={handleAddAppointment}>Submit</Button></p>
              <p>Or click here to call</p>
              </Card>
          </div>
        </header>
    </div>
    
  );
}

export default NewAppointment;