import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './AppointmentAdminApproval.css';
import { Button, Card, Row, Col } from 'antd';
import AppointmentPageAdminApproval from '../AppointmentPageAdminApproval/AppointmentPageAdminApproval'


const Appointment = props => {

  
const [visibility, setVisibility] = useState(false);

const updateVisibility = e =>
{
  setVisibility(e);
}
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
          <Button
            type="primary"
            onClick={() => {
              updateVisibility(true);
            }}
          >
            Appointment Details and Approval
          </Button>
          <AppointmentPageAdminApproval
            visible={visibility}
            onCancel={() => {
              updateVisibility(false);
            }}
            data = {props.data}
          />
        </Col>
      </Row>
    </Card>
  );
};
export default Appointment;
