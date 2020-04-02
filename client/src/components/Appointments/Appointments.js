import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import './Appointments.css';
import Appointment from '../Appointment/Appointment';

const Appointments = props => {
  // TODO: Use logged in email from useReducer + useContext
  const { email } = props;

  const dummyData = {
    patientEmail: email,
    title: 'Checkup Appointment',
    time: new Date(),
    location: '1505 SW Archer Road, Gainesville, FL 32608',
    reminders: ['Bring your best smile! ', 'Remember to floss']
  };

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!email) return;
    // TODO: Fetch appointments with backend endpoint
    const getAppointments = async () => {
      const response = await fetch(`/appointments/${email}`, {
        // TODO: Find out how to actually send the authorized email/password
        headers: {
          Authorization: 'Basic YWxhZGRpbjpvcGVuc2VzYW1l',
          'Cache-Control': 'no-cache'
        }
      });
      const res2 = response.clone();
      try {
        const body = await response.json();
        if (response.status !== 200) throw Error(body.error);
        console.log(body);
        setAppointments(body.appointments || []);
      } catch {
        throw Error(await res2.text());
      }
    };
    // setAppointments([dummyData]);
    getAppointments().catch(err => console.log(err));
  }, [email]);
/*
  const handleAddAppointment = appointment => {
    const addAppointment = async () => {
      // const response = await fetch(`/appointments/${encodeURIComponent(email)}`, {
      const response = await fetch('/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      });
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.error);
      }

      console.log(body);
      setAppointments(appointments => [...appointments, appointment]);
    };

    addAppointment().catch(err => console.log(err));
  };*/

  return (

    <div className='Appointments'>
      <Card style = {{margin : 10}}>
        Appointments
        {appointments.map((appointment, index) => (
          <Appointment key={index} data={appointment} id={index} />
        ))}
      </Card>
    </div>
   );

};

export default Appointments;
