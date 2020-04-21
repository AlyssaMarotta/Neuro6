import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './NewAppointment.css';
import { Calendar, Select, Button, Input, Card } from 'antd';
import moment from 'moment';

const NewAppointment = (props) => {
  console.count(props.email);
  const email = props.email;
  const initForm = {
    patientEmail: email,
    title: '',
    time: new Date(),
    location: ' 1505 SW Archer Road Gainesville, FL 32608',
    reminders: ['Bring your best smile!', 'Remember to floss'],
  };

  var d = new Date();

  const [formData, setFormData] = useState(initForm);
  const { Option } = Select;
  const [submitted, setSubmitted] = useState(false);

  const UpdateDate = (e) => {
    d.setFullYear(e.format('YYYY'));
    d.setDate(e.format('DD'));
    d.setMonth(e.format('MM') - 1);
    console.log(d);
  };
  const onPanelChange = (value) => {
    UpdateDate(value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleFormTimeChange = (e) => {
    const { value } = e;
    d.setHours(value.substring(0, 2));
    d.setMinutes(value.substring(3, 5));
    console.log(d);
    setFormData((formData) => ({
      ...formData,
      ['time']: d, //new date(date + " " + value)//date +" " + value + " GMT-0400 (Eastern Daylight Time)",
    }));
    console.log(formData);
  };

  const handleFormProviderChange = (e) => {
    const { value } = e;
    setFormData((formData) => ({
      ...formData,
      providerEmail: value,
    }));
    console.log(formData);
  };

  const handleAddAppointment = (appointment) => {
    console.log('Trying To Add appointment');
    const addAppointment = async () => {
      const response = await fetch('/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const body = await response.json();
      if (response.status !== 200) {
        console.log('Failed add Appointment');
        throw Error(body.error);
      } else {
        setSubmitted(true);
      }
    };
    addAppointment().catch((err) => console.log(err));
  };
  if (submitted) return <Redirect to={'/user'} />;
  return (
    <div className='App'>
      <header className='App-header'>
        Request a New Appointment
        <div className='NewAppointment'>
          <Card>
            <Card>
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </Card>
            <p>
              {' '}
              <Select
                labelInValue
                placeholder={'Select A Time'}
                defaultValue={{ key: '0:00' }}
                style={{ width: 120 }}
                onChange={handleFormTimeChange}
              >
                <Option value='08:00:00' hour='8' minute='00'>
                  8:00 am
                </Option>
                <Option value='08:30:00' hour='8' minute='30'>
                  8:30 am
                </Option>
                <Option value='09:00:00' hour='9' minute='00'>
                  9:00 am
                </Option>
                <Option value='09:30:00' hour='9' minute='30'>
                  9:30 am
                </Option>
                <Option value='10:00:00' hour='10' minute='00'>
                  10:00 am
                </Option>
                <Option value='10:30:00' hour='10' minute='30'>
                  10:30 am
                </Option>
                <Option value='11:00:00' hour='11' minute='00'>
                  11:00 am
                </Option>
                <Option value='11:30:00' hour='11' minute='30'>
                  11:30 am
                </Option>
                <Option value='12:00:00' hour='12' minute='00'>
                  12:00 pm
                </Option>
                <Option value='12:30:00' hour='12' minute='30'>
                  12:30 pm
                </Option>
                <Option value='13:00:00' hour='13' minute='00'>
                  1:00 pm
                </Option>
                <Option value='13:30:00' hour='13' minute='30'>
                  1:30 pm
                </Option>
                <Option value='14:00:00' hour='14' minute='00'>
                  2:00 pm
                </Option>
                <Option value='14:30:00' hour='14' minute='30'>
                  2:30 pm
                </Option>
                <Option value='15:00:00' hour='15' minute='00'>
                  3:00 pm
                </Option>
                <Option value='15:30:00' hour='15' minute='30'>
                  3:30 pm
                </Option>
                <Option value='16:00:00' hour='16' minute='00'>
                  4:00 pm
                </Option>
                <Option value='16:30:00' hour='16' minute='30'>
                  4:30 pm
                </Option>
                <Option value='17:00:00' hour='17' minute='00'>
                  5:00 pm
                </Option>
                <Option value='17:30:00' hour='17' minute='30'>
                  5:30 pm
                </Option>
              </Select>
            </p>
            <p>
              {' '}
              <Select
                labelInValue
                placeholder={'Select Provider'}
                style={{ width: '80%' }}
                onChange={handleFormProviderChange}
              >
                <Option value='smith@gmail.com'>Dr. Smith</Option>
                <Option value='brown@gmail.com'>
                  {/*email*/}
                  Dr. Brown
                </Option>
                <Option value='herbert@gmail.com'>Dr. Herbert</Option>
              </Select>
            </p>
            <Input
              name='title'
              className='textbox'
              placeholder='Reason for Appointment'
              required
              onChange={handleFormChange}
            />
            <p>
              <Button onClick={handleAddAppointment}>Submit</Button>
            </p>
            <p>Or click here to call:</p>
            <a href='tel:352-273-6990'>352-273-6990</a>
          </Card>
        </div>
      </header>
    </div>
  );
};

export default NewAppointment;
