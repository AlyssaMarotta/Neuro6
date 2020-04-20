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
  Button
} from 'antd';
import AppointmentAdmin from '../../components/AppointmentAdmin/AppointmentAdmin';
import AppointmentAdmin2 from '../../components/AppointmentAdmin2/AppointmentAdmin2';
import CreateUserAdmin from '../../components/CreateUserAdmin/CreateUserAdmin'
import CreateAdmin from '../../components/CreateAdmin/CreateAdmin'
import moment from 'moment';


const Admin = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const { Search } = Input;
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo,  setDateTo] = useState(new Date(new Date().setDate(new Date().getDate() + 30)));
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const dateFormat = 'YYYY/MM/DD';
  const { RangePicker } = DatePicker;
  const [searchEmail, setSearchEmail] = useState("");
  const [searchUserEmail, setSearchUserEmail] = useState("");
  const [searchUserFirstName, setSearchUserFirstName] = useState("");
  const [searchUserLastName, setSearchUserLastName] = useState("");
  const [createUserVisibility, setCreateUserVisibility] = useState(false);
  const [createAdminVisibility, setCreateAdminVisibility] = useState(false);

const updateCreateAdminVisibility = e =>
{
  setCreateAdminVisibility(e);
}

const updateCreateUserVisibility = e =>
{
  setCreateUserVisibility(e);
}

  const updateSelectDate = e => {
    if (e == null || e[1] == null){
      setDateFrom(new Date(new Date().setYear(new Date().getYear() - 10)));
      setDateTo(new Date(new Date().setYear(new Date().getYear() + 10)));
    }
    else 
    {
      setDateFrom(e[0]._d);
      setDateTo(e[1]._d);
    }
    //TODO FIX BUG: when a user hits the x within the range picker
  }

  const updateSearchUserEmail = e => {
    console.log(e.target.value);
    setSearchUserEmail(e.target.value);
  }

  const updateSearchUserFirstName = e => {
    console.log(e.target.value);
    setSearchUserFirstName(e.target.value);
  }

  const updateSearchUserLastName = e => {
    console.log(e.target.value);
    setSearchUserLastName(e.target.value);
  }

  const updateSearchEmail = e => {
    console.log(e.target.value);
    setSearchEmail(e.target.value);
  }

  const updateAppointment = e => {
    console.log('updating appointments' + e);
    setAppointments(e);
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

  let filteredAppointments = appointments.filter(
    (directory) => {
        return directory.patientEmail.toLowerCase().indexOf(searchEmail.toLowerCase()) !== -1; //Search  
    }
);
  let filteredDateAppointments = filteredAppointments.filter(
    (directory) => {
        return  moment(directory.time).isBetween(dateFrom, dateTo);
    });

let filteredUsers = users.filter(
  (directory) => {
      return (((directory.email.toLowerCase().indexOf(searchUserEmail.toLowerCase()))  )) !== -1;
      //let firstName = (email.name.first.toLowerCase().indexOf(searchUserFirstName)) !== -1;
      //.name.toLowerCase().indexOf(searchUserLastName)) !== -1; //Search  
  }
);
let filteredFirstNameUsers =  filteredUsers.filter(
  (directory) => {
    return (directory.name.first.toLowerCase().indexOf(searchUserFirstName.toLowerCase())) !== -1;
  }
);

let filteredLastNameUsers =  filteredFirstNameUsers.filter(
  (directory) => {
    return (directory.name.last.toLowerCase().indexOf(searchUserLastName.toLowerCase())) !== -1;
  }
);

let filteredUserAppointments = appointments.filter(
  (directory) => {
      if(selectedUser)
      return directory.patientEmail.toLowerCase().indexOf(selectedUser.email.toLowerCase()) !== -1; //Search  
      else return null;
  }
);

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
    // <header className='App-header-Admin'>
      <Row gutter={[20, 8]}>
        <Col flex={4}>
          <div className='card-container'>
            <Tabs type='card'>
              <TabPane tab='Appointments' key='1'>
                <Search
                  placeholder='Patients Email'
                  onChange= {value => updateSearchEmail(value)}
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
                <RangePicker
                  allowEmpty = {[false, false]}
                  defaultValue={[
                    moment(dateFrom, dateFormat),
                    moment(dateTo , dateFormat)
                  ]}
                  onCalendarChange= {value => updateSelectDate(value)}
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
                  onChange= {value => updateSearchUserEmail(value)}
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
                <Search
                  placeholder='First Name'
                  onChange= {value => updateSearchUserFirstName(value)}
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
                <Search
                  placeholder='Last Name'
                  onChange= {value => updateSearchUserLastName(value)}
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
                      <Button type="primary" onClick={() => updateDrawerVisible(true, user)}>
                        More Information
                      </Button>

                      {/* <p>{user.dob}</p> */}
                    </Card>
                  ))}
                      <Drawer
                        width={"50%"}
                        title= {selectedUser && selectedUser.name.first + " " +  selectedUser.name.last}
                        placement="right"
                        closable={false}
                        onClose={() => updateDrawerVisible(false, null)}
                        visible={drawerVisible}
                      >
                        <p>{selectedUser && selectedUser.email}</p>
                        <p>{selectedUser && moment(selectedUser.dob).format('MMMM Do, YYYY')}</p>
                        <Card 
                          style={styles.card, {background: "#ffffff"}}
                          bodyStyle={styles.cardBody}
                          align='left'
                          title='Appointments'
                          text-align='left'
                          // style = {{margin : 10, background: "#ffffff"}}
                          >
                          Appointments
                          {selectedUser && filteredUserAppointments.map((appointment, index) => (
                            <AppointmentAdmin2 key={index} data={appointment} id={index} />
                          ))}
                        </Card>
                      </Drawer>
                </Card>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        <Col flex={2}>
          <Card style={{ margin: 10 }}>
            <div className='AdminCalendarComponent'>
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
                {/* <Input className='buttons' value='Create a new User' /> */}
                <Button
                  type="primary"
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
                  type="primary"
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
