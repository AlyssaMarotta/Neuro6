import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import Reminders from '../../components/Reminders/Reminders';
import Appointments from '../../components/Appointments/Appointments';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import { PromiseProvider } from 'mongoose';
import { Row, Col,  } from 'antd';


const User = (props) => {
  return (
    <Row gutter ={[20,8]}>
    <Col flex={6}>
            <Reminders />
            <Appointments email = {props.email}/>
          </Col>
            <Col flex={2}>  
            <CalendarComponent />
            </Col>
          </Row>
    
  );
}

export default User;
