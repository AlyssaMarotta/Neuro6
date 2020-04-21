import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CalendarComponent.css';
import { Calendar } from 'antd';
import 'antd/dist/antd.dark.css';
import { Input, Button, Card, Badge } from 'antd';
import SimpleReactCalendar from 'simple-react-calendar';
//import 'react-calendar/dist/Calendar.css';
import ReactCalendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios';

const CalendarComponent = (props) => {
  const { email } = props;

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!email) return;
    // TODO: Fetch appointments with backend endpoint
    const getAppointments = async () => {
      const response = await axios.post(`/appointments/${email}`);
      const body = response.data;
      if (response.status !== 200) {
        alert('Something went wrong when getting your appointments');
        throw Error(body.error);
      }
      console.log(body);
      setAppointments(body.appointments || []);
    };
    // setAppointments([dummyData]);
    getAppointments().catch((err) => console.log(err));
  }, [email]);

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  return (
    <div className='CalendarComponent'>
      <div className='site-calendar-demo-card'>
        {/* <Calendar fullscreen={false} onPanelChange={onPanelChange} dateCellRender={dateCellRender}/> */}
        <ReactCalendar
          calendarType='US'
          oneWeekCalendar={true}
          tileClassName={({ date, view }) => {
            if (
              appointments
                .map((appointment, index) =>
                  moment(appointment.time).format('DD-MM-YYYY')
                )
                .find((x) => x === moment(date).format('DD-MM-YYYY'))
            ) {
              return 'highlight';
            }
          }}
        />
      </div>
      <p></p>
      <Link to='/NewAppointment'>
        <Button type='primary' size='large'>
          Request an Appointment
        </Button>
      </Link>
    </div>
  );
};
export default CalendarComponent;
