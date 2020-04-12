import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CalendarComponent.css';
import { Calendar } from 'antd';
import 'antd/dist/antd.dark.css';
import { Input, Button, Card, Badge } from 'antd';
import SimpleReactCalendar from 'simple-react-calendar'
//import 'react-calendar/dist/Calendar.css';
import ReactCalendar from 'react-calendar';
import moment from 'moment';

const CalendarComponent = (props) => {

  const { email } = props;

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

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  




  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' }
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' }
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' }
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  // function dateCellRender() {
  //   return (
  //     <ul className="events">
  //       {appointments.map((appointment, index) => (
  //         <Badge text={appointment.title} />
  //       ))}
  //     </ul>
  //   );
  // }

  const mark = [
    '03-04-2020',
    '15-04-2020',
    '24-04-2020'
]

  return (
    <Card  style={{ padding : 0, margin: 10 }}>
    <div className='CalendarComponent'>
      <div className="site-calendar-demo-card">
        
    {/* <Calendar fullscreen={false} onPanelChange={onPanelChange} dateCellRender={dateCellRender}/> */}
    <ReactCalendar calendarType="US"
              oneWeekCalendar={true}
              tileClassName={({ date, view }) => {
              if(mark.find(x=>x===moment(date).format("DD-MM-YYYY"))){
              return  'highlight'
              }
            }}
              />
  </div>
      <Link to='/NewAppointment'>
      <Button type='primary' size='large'>Request an Appointment</Button>
      </Link>
    </div>
    </Card>
  );
};
export default CalendarComponent;


