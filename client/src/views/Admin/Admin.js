import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import { Tabs } from 'antd';
import { Calendar } from 'antd';
import { Row, Col, Divider } from 'antd';
import { Input } from 'antd';
import Appointment from '../Appointment/Appointment';


const Admin = () => {

  const [appointments, setAppointments] = useState([]);
  const { Search } = Input;

  /*useEffect(() => {
    const getAppointments = async () => {
      const response = await fetch(`/appointments/getAll`, {
        headers: {
          'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l',
          'Cache-Control': 'no-cache',
        }
      });
      try {
        const body = await response.json();
        if (response.status !== 200) throw Error(body.error);
        console.log(body);
        setAppointments(body.appointments || []);
      } catch {
        throw Error(await response.clone().text());
      }

    };

    // setAppointments([dummyData]);
    getAppointments().catch(err => console.log(err));
  },);
  */
//WHENEVER WE FIX /APPOINTMENT/GETALL UNCOMMENT ABOVE 

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  const { TabPane } = Tabs;
  return (
        <header className='App-header-Admin'>
          <Row gutter ={[20,8]}>
            <Col flex={3}>
            <div className="card-container">
              <Tabs type="card">
                      <TabPane tab="Appointments" key="1">
                      <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200}}
                      />
                        {appointments.map((appointment, index) => (
                          <Appointment key={index} data={appointment} id = {index} />
                        ))}
                      </TabPane>
                      <TabPane tab="Patients" key="2">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                      </TabPane>
              </Tabs>
              </div>
            </Col>
            <Col flex={2}>    
              <div className='CalendarComponent'>
                <div className="site-calendar-demo-card">
                  <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </div>
                <Link to='/NewAppointment'>
                  <Input className='buttons' value = "Schedule an Appointment"/>
                </Link>
              </div>
            </Col>
          </Row>
        </header>
  );
}

export default Admin;