import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './AppointmentAdmin2.css';
import { Button, Card, Row, Col } from 'antd';



const Appointment = props => {
  const { patientEmail, title, time, location, reminders } = props.data;

  return (
    <Card align='left' type='inner' title={title} hoverable='true' style = {{background: "#FFFFFF"}}>
      <Row>
        <Col>
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