import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './AppointmentAdmin2.css';
import { Button, Card, Row, Col } from 'antd';

import AppointmentPageAdmin from '../AppointmentPageAdmin/AppointmentPageAdmin'



const Appointment = props => {
  const { patientEmail, title, time, location, reminders } = props.data;
  const [visibility, setVisibility] = useState(false);

  const updateVisibility = e =>
  {
    setVisibility(e);
  }

  return (
    <Card align='left' type='inner' title={title} hoverable='true' style = {{background: "#FFFFFF"}}>
      <Row>
        <Col>
          <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
          <Button
            type="primary"
            onClick={() => {
              updateVisibility(true);
            }}
          >
            Appointment Details
          </Button>
          <AppointmentPageAdmin
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