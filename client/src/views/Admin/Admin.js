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
  Card,
  Drawer,
  Button,
} from 'antd';
import AppointmentAdmin from '../../components/AppointmentAdmin/AppointmentAdmin';
import AppointmentAdminApproval from '../../components/AppointmentAdminApproval/AppointmentAdminApproval';
import AppointmentAdmin2 from '../../components/AppointmentAdmin2/AppointmentAdmin2';
import CreateUserAdmin from '../../components/CreateUserAdmin/CreateUserAdmin';
import CreateAdmin from '../../components/CreateAdmin/CreateAdmin';
import PushAppointmentsBack from '../../components/PushAppointmentsBack/PushAppointmentsBack';
import moment from 'moment';
import axios from 'axios';

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentReqs, setAppointmentReq] = useState([]);
  const [users, setUsers] = useState([]);
  const { Search } = Input;
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(
    new Date(new Date().setDate(new Date().getDate() + 30))
  );
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const dateFormat = 'YYYY/MM/DD';
  const { RangePicker } = DatePicker;
  const [searchEmail, setSearchEmail] = useState('');
  const [searchUserEmail, setSearchUserEmail] = useState('');
  const [searchUserFirstName, setSearchUserFirstName] = useState('');
  const [searchUserLastName, setSearchUserLastName] = useState('');
  const [createUserVisibility, setCreateUserVisibility] = useState(false);
  const [createAdminVisibility, setCreateAdminVisibility] = useState(false);
  const [
    pushAppointmentsBackVisibility,
    setPushAppointmentsBackVisibility,
  ] = useState(false);

  const updatePushAppointmentsBackVisibility = e => {
    setPushAppointmentsBackVisibility(e);
  };

  const updateCreateAdminVisibility = e => {
    setCreateAdminVisibility(e);
  };

  const updateCreateUserVisibility = e => {
    setCreateUserVisibility(e);
  };

  const updateSelectDate = e => {
    if (e == null || e[1] == null) {
      setDateFrom(new Date(new Date().setYear(new Date().getYear() - 10)));
      setDateTo(new Date(new Date().setYear(new Date().getYear() + 10)));
    } else {
      setDateFrom(e[0]._d);
      setDateTo(e[1]._d);
    }
    //TODO FIX BUG: when a user hits the x within the range picker
  };

  const updateSearchUserEmail = e => {
    console.log(e.target.value);
    setSearchUserEmail(e.target.value);
  };

  const updateSearchUserFirstName = e => {
    console.log(e.target.value);
    setSearchUserFirstName(e.target.value);
  };

  const updateSearchUserLastName = e => {
    console.log(e.target.value);
    setSearchUserLastName(e.target.value);
  };

  const updateSearchEmail = e => {
    console.log(e.target.value);
    setSearchEmail(e.target.value);
  };

  const updateAppointment = e => {
    console.log('updating appointments' + e);
    setAppointments(e);
  };

  const updateAppointmentReq = e => {
    console.log('updating appointment requesr');
    console.log(e);
    setAppointmentReq(e);
  };

  const updateUsers = e => {
    console.log('updating Users' + e);
    setUsers(e);
  };

  const updateDrawerVisible = (e, s) => {
    console.log('updating Users' + e);
    setSelectedUser(s);
    setDrawerVisible(e);
  };

  useEffect(() => {
    const getAppointments = async () => {
      const response = await axios.post('/appointmentsgetall');
      const body = response.data;
      if (response.status !== 200) {
        throw Error(body.error);
      }
      updateAppointment(body.appointments);
    };
    getAppointments().catch(err => {
      alert('There was an issue with getting appointments');
      console.log(err);
    });
  }, []);

  useEffect(() => {
    const getAppointmentRequests = async () => {
      const response = await axios.post('/appointmentrequestsgetall');
      const body = response.data;
      if (response.status !== 200) {
        throw Error(body.error);
      }
      updateAppointmentReq(body.appointmentReqs);
    };
    getAppointmentRequests().catch(err => {
      alert('There was an issue getting appointment requests');
      console.log(err)
    });
  }, []);

  let filteredAppointments = appointments.filter(directory => {
    return (
      directory.patientEmail
        .toLowerCase()
        .indexOf(searchEmail.toLowerCase()) !== -1
    ); //Search
  });
  let filteredDateAppointments = filteredAppointments.filter(directory => {
    return moment(directory.time).isBetween(dateFrom, dateTo);
  });

  let filteredUsers = users.filter(directory => {
    return (
      directory.email.toLowerCase().indexOf(searchUserEmail.toLowerCase()) !==
      -1
    );
    //let firstName = (email.name.first.toLowerCase().indexOf(searchUserFirstName)) !== -1;
    //.name.toLowerCase().indexOf(searchUserLastName)) !== -1; //Search
  });
  let filteredFirstNameUsers = filteredUsers.filter(directory => {
    return (
      directory.name.first
        .toLowerCase()
        .indexOf(searchUserFirstName.toLowerCase()) !== -1
    );
  });

  let filteredLastNameUsers = filteredFirstNameUsers.filter(directory => {
    return (
      directory.name.last
        .toLowerCase()
        .indexOf(searchUserLastName.toLowerCase()) !== -1
    );
  });

  let filteredUserAppointments = appointments.filter(directory => {
    if (selectedUser)
      return (
        directory.patientEmail
          .toLowerCase()
          .indexOf(selectedUser.email.toLowerCase()) !== -1
      );
    //Search
    else return null;
  });

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.post('/usersgetall');
      const body = response.data;
      if (response.status !== 200) {
        throw Error(body.error);
      }
      updateUsers(body.users);
    };
    getUsers().catch(err => {
      alert('There was an issue when trying to get all users');
      console.log(err)
    });
  }, []);

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  const { TabPane } = Tabs;

  const styles = {
    card: {
      maxHeight: '100%',
    },
    cardBody: {
      maxHeight: 550,
      overflow: 'auto',
    },
  };

  return (
    // <header className='App-header-Admin'>
    <Row gutter={[20, 8]}>
      <Col flex={4}>
        <div className='card-container'>
          <Tabs type='card'>
            <TabPane tab='Appointments' key='1'>
              <Search
                placeholder='Patients Email'
                onChange={value => updateSearchEmail(value)}
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
              <RangePicker
                allowEmpty={[false, false]}
                defaultValue={[
                  moment(dateFrom, dateFormat),
                  moment(dateTo, dateFormat),
                ]}
                onCalendarChange={value => updateSelectDate(value)}
                format={dateFormat}
              />
              <Card
                style={styles.card}
                bodyStyle={styles.cardBody}
                align='left'
                title='Appointments'
                text-align='left'
              >
                {filteredDateAppointments.map((appointment, index) => (
                  <AppointmentAdmin key={index} data={appointment} id={index} />
                ))}
              </Card>
            </TabPane>
            <TabPane tab='Patients' key='2'>
              <Search
                placeholder='Patients Email'
                onChange={value => updateSearchUserEmail(value)}
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
              <Search
                placeholder='First Name'
                onChange={value => updateSearchUserFirstName(value)}
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
              <Search
                placeholder='Last Name'
                onChange={value => updateSearchUserLastName(value)}
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
                {filteredLastNameUsers.map((user, index) => (
                  <Card key={index}>
                    <p>{user.email}</p>
                    <p>
                      {user.name.first} {user.name.last}
                    </p>
                    <Button
                      type='primary'
                      onClick={() => updateDrawerVisible(true, user)}
                    >
                      More Information
                    </Button>

                    {/* <p>{user.dob}</p> */}
                  </Card>
                ))}
                <Drawer
                  width={'50%'}
                  title={
                    selectedUser &&
                    selectedUser.name.first + ' ' + selectedUser.name.last
                  }
                  placement='right'
                  closable={false}
                  onClose={() => updateDrawerVisible(false, null)}
                  visible={drawerVisible}
                >
                  <p>{selectedUser && selectedUser.email}</p>
                  <p>
                    {selectedUser &&
                      moment(selectedUser.dob).format('MMMM Do, YYYY')}
                  </p>
                  <Card
                    style={(styles.card, { background: '#ffffff' })}
                    bodyStyle={styles.cardBody}
                    align='left'
                    title='Appointments'
                    text-align='left'
                    // style = {{margin : 10, background: "#ffffff"}}
                  >
                    Appointments
                    {selectedUser &&
                      filteredUserAppointments.map((appointment, index) => (
                        <AppointmentAdmin2
                          key={index}
                          data={appointment}
                          id={index}
                        />
                      ))}
                  </Card>
                </Drawer>
              </Card>
            </TabPane>
            <TabPane tab='Appointment Requests' key='3'>
              <Search
                placeholder='Patients Email'
                onChange={value => updateSearchEmail(value)}
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
              <RangePicker
                allowEmpty={[false, false]}
                defaultValue={[
                  moment(dateFrom, dateFormat),
                  moment(dateTo, dateFormat),
                ]}
                onCalendarChange={value => updateSelectDate(value)}
                format={dateFormat}
              />
              <Card
                style={styles.card}
                bodyStyle={styles.cardBody}
                align='left'
                title='Appointment Requests'
                text-align='left'
              >
                {appointmentReqs.map((appointmentReqs, index) => (
                  <AppointmentAdminApproval
                    key={index}
                    data={appointmentReqs}
                    id={index}
                  />
                ))}
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </Col>
      <Col flex={2}>
        <Card title='Calendar' align='center' style={{ margin: 10 }}>
          <div className='AdminCalendarComponent'>
            {' '}
            <p>
              <div className='site-calendar-demo-card'>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </div>
            </p>
            <p>
              <Link to='/NewAppointmentAdmin'>
                <Button type='primary'>Schedule an Appointment</Button>
              </Link>
            </p>
            <p>
              <Button
                type='primary'
                onClick={() => {
                  updatePushAppointmentsBackVisibility(true);
                }}
              >
                Push All Appointments Back
              </Button>
            </p>
            <PushAppointmentsBack
              visible={pushAppointmentsBackVisibility}
              onCancel={() => {
                updatePushAppointmentsBackVisibility(false);
              }}
            />
          </div>
        </Card>
        <Card title='Create New Users' align='center' style={{ margin: 10 }}>
          <div className='AdminNewUsersComponent'>
            <p>
              {/* <Input className='buttons' value='Create a new User' /> */}
              <Button
                type='primary'
                onClick={() => {
                  updateCreateUserVisibility(true);
                }}
              >
                Create a new User
              </Button>
              <CreateUserAdmin
                visible={createUserVisibility}
                onCancel={() => {
                  updateCreateUserVisibility(false);
                }}
              />
            </p>
            <p>
              {/* <Input className='buttons' value='Create a new Admin' /> */}
              <Button
                type='primary'
                onClick={() => {
                  updateCreateAdminVisibility(true);
                }}
              >
                Create a new Admin
              </Button>
              <CreateAdmin
                visible={createAdminVisibility}
                onCancel={() => {
                  updateCreateAdminVisibility(false);
                }}
              />
            </p>
            {/* <p>
                <Link to='/AppointmentApproval'>
                  <Input className='buttons' value='approve appointment' />
                </Link>
              </p> */}
          </div>
        </Card>
      </Col>
    </Row>
    // </header>
  );
};

export default Admin;
