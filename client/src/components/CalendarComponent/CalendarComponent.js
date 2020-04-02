import React from 'react';
import { Link } from 'react-router-dom';
import './CalendarComponent.css';
import { Calendar } from 'antd';
import 'antd/dist/antd.dark.css';
import { Input, Button, Card } from 'antd';

const CalendarComponent = () => {

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  
  return (
    <Card  style={{ padding : 0, margin: 10 }}>
    <div className='CalendarComponent'>
      <div className="site-calendar-demo-card">
        
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>
      <Link to='/NewAppointment'>
      <Button type='primary' size='large'>Schedule an Appointment</Button>
      </Link>
    </div>
    </Card>
  );
};
export default CalendarComponent;
