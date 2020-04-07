import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './AppointmentAdmin.css';
import { Button, Card, Row, Col } from 'antd';



const Appointment = props => {
    /*const initUser = {
        Name: 
        {
            first: "",
            last: "",
        },
      };*/
   // const [user, setUser] = useState(initUser);
  const { patientEmail, title, time, location, reminders } = props.data;
/*
  const initForm = {
    email: patientEmail,
  };

  useEffect(() => {
      console.log("getting name " + patientEmail);
    const getUser = async () => {
        const response = await fetch('/appointments', {
          headers: { 'Content-Type': 'application/json' },
          body: { email: patientEmail },
        });
        const body = await response.json();
        console.log(body);
        setUser(body.user);
      getUser().catch(err => console.log(err));
    }
    }, []);
*/
  return (
    <Card align='left' type='inner' title={title} hoverable='true'>
      <Row>
        <Col>
            <p>{patientEmail}</p>
          <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
          <Link to={'/Appointment/' + props.id}>
            <Button type='primary'>More Details</Button>
          </Link>
        </Col>
      </Row>
    </Card>
  );
};
export default Appointment;
