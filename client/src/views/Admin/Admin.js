import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import {
  Row,
  Col,
  Divider,
  DatePicker,
  Tabs,
  Calendar,
  Input,
  Card
} from 'antd';
import Appointment from '../../components/Appointment/Appointment';
import moment from 'moment';

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const { Search } = Input;
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const dateFormat = 'YYYY/MM/DD';
  const { RangePicker } = DatePicker;

  const updateAppointment = e => {
    console.log('updating appointments' + e);
    setAppointments(e);
  };

  const updateUsers = e => {
    console.log('updating Users' + e);
    setUsers(e);
  };

  useEffect(() => {
    const getAppointments = async () => {
      const appointmentResponse = await fetch('/appointmentsgetall', {});
      try {
        const body = await appointmentResponse.json();
        if (appointmentResponse.status !== 200) throw Error(body.error);
        updateAppointment(body.appointments);
      } catch {
        throw Error();
      }
    };
    getAppointments().catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const userResponse = await fetch('/usersgetall', {});
      try {
        const body = await userResponse.json();
        if (userResponse.status !== 200) throw Error(body.error);
        updateUsers(body.users);
      } catch {
        throw Error();
      }
    };
    getUsers().catch(err => console.log(err));
  }, []);

  //WHENEVER WE FIX /APPOINTMENT/GETALL UNCOMMENT ABOVE

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  const { TabPane } = Tabs;

  const styles = {
    card: {
      maxHeight: '100%',
    },
    cardBody: {
      maxHeight: 400,
      overflow: 'auto',
    }
  };

  return (
    <header className='App-header-Admin'>
      <Row gutter={[20, 8]}>
        <Col flex={4}>
          <div className='card-container'>
            <Tabs type='card'>
              <TabPane tab='Appointments' key='1'>
                <Search
                  placeholder='Patients Email'
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
                <RangePicker
                  defaultValue={[
                    moment('2020/01/01', dateFormat),
                    moment('2020/12/31', dateFormat)
                  ]}
                  format={dateFormat}
                />
                <Card
                  style={styles.card}
                  bodyStyle={styles.cardBody}
                  align='left'
                  title='Appointments'
                  text-align='left'
                >
                  {appointments.map((appointment, index) => (
                    <Appointment key={index} data={appointment} id={index} />
                  ))}
                </Card>
              </TabPane>
              <TabPane tab='Patients' key='2'>
                <Search
                  placeholder='Patients Email'
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
                <Card
                  style={styles.card}
                  bodyStyle={styles.cardBody}
                  align='left'
                  title='Patients'
                  text-align='left'
                >
                  {users.map((user, index) => (
                    <Card key={index}>
                      <p>{user.email}</p>
                      <p>
                        {user.name.first} {user.name.last}
                      </p>
                      <p>{user.dob}</p>
                    </Card>
                  ))}
                </Card>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        <Col flex={2}>
          <Card style={{ margin: 10 }}>
            <div className='CalendarComponent'>
              {' '}
              <p>
                <div className='site-calendar-demo-card'>
                  <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </div>
              </p>
              <p>
                <Link to='/NewAppointmentAdmin'>
                  <Input className='buttons' value='Schedule an Appointment' />
                </Link>
              </p>
              <p>
                <Input className='buttons' value='Create a new User' />
              </p>
              <p>
                <Input className='buttons' value='Create a new Admin' />
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </header>
  );
};

export default Admin;
