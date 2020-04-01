import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import { Row, Col, Divider, DatePicker, Tabs, Calendar, Input } from 'antd';
import Appointment from '../Appointment/Appointment';
import moment from 'moment';


const Admin = () => {

  const [appointments, setAppointments] = useState([]);
  const { Search } = Input;
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const dateFormat = 'YYYY/MM/DD';
  const { RangePicker } = DatePicker;

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
                        placeholder="Patients Email"
                        onSearch={value => console.log(value)}
                        style={{ width: 200}}
                      />
                      <RangePicker
                        defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                        format={dateFormat}
                      />
                        {appointments.map((appointment, index) => (
                          <Appointment key={index} data={appointment} id = {index} />
                        ))}
                      </TabPane>
                      <TabPane tab="Patients" key="2">
                      <Search
                        placeholder="Patients Email"
                        onSearch={value => console.log(value)}
                        style={{ width: 200}}
                      />
                        <p>Patient 1</p>
                        <p>Patient 2</p>
                        <p>Patient 3</p>
                      </TabPane>
              </Tabs>
              </div>
            </Col>
            <Col flex={2}>    
              
                <div className='CalendarComponent'> <p>
                <div className="site-calendar-demo-card">
                 <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </div>
                </p>
                
                <p><Link to='/NewAppointmentAdmin'>
                  <Input className='buttons' value = "Schedule an Appointment"/>
                </Link></p>
                <p><Input className='buttons' value = "Create a new User"/></p>
                <p><Input className='buttons' value = "Create a new Admin"/></p>
              </div>
            </Col>
          </Row>
        </header>
  );
}

export default Admin;