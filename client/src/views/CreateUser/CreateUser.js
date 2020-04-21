import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './CreateUser.css';
import { DatePicker, Card, Button, Form, Input } from 'antd';

const initForm = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: ''
};

const CreateUser = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [formData, setFormData] = useState(initForm);
  const [authorized, setAuthorized] = useState(false);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = e => {
    setLastName(e.target.value);
  }

  const handleDobChange = e => {
    setDob(e.target.value);
  }

  const handleSubmit = e => {
    //e.preventDefault();
    //sourced from https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61
    const createAccount = async () => {
      const response = await fetch('/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        // body: JSON.stringify({
        //   email,
        //   password,
        //   firstName,
        //   lastName,
        //   dob
        // })
      });
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.error);
      }

      console.log(body);
      setAuthorized(true);
      props.set(formData.email);
    };

    createAccount().catch(err => console.log(err));
  };

  if (authorized) return <Redirect to={'/User'} />;

  return (
    <div className='App'>
      <header className='App-header'>
        <img
          className='FrontImage'
          src={'/UFHealthBuilding.jpg'}
          alt='Uf Health Building'
        />
        <div className='section'>
          <Card title='Create Account' align='left' span={14}>
          <Form onFinish={handleSubmit}>
            <Form.Item label='Email' 
            required>
              {/* Email:{' '} */}
              <Input
                //addonBefore='Email'
                type='email'
                name='email'
                required
                onChange={handleFormChange}
              />
            </Form.Item>
            <p>{'\n'}</p>
            <Form.Item label='Password'
            required>
              {/* Password:{' '} */}
              <Input
                //addonBefore='Password'
                type='password'
                name='password'
                //placeholder='Password'
                //required
                onChange={handleFormChange}
                minLength={8}
              />
            </Form.Item>
            <p>{'\n'}</p>
            <Form.Item label='First Name'
            required>
              {/* First Name:{' '} */}
              <Input
                //addonBefore='First Name'
                type='text'
                name='firstName'
                //placeholder='First Name'
                //required
                onChange={handleFormChange}
              />
            </Form.Item>
            <p>{'\n'}</p>
            <Form.Item label='Last Name'
            required>
              {/* Last Name:{' '} */}
              <Input
                //addonBefore='Last Name'
                type='text'
                name='lastName'
                //placeholder='Last Name'
                //required
                onChange={handleFormChange}
              />
            </Form.Item>
            <p>{'\n'}</p>

            <Form.Item label='Date of Birth'
            required>
              {/* Date of Birth:{' '} */}
              <Input
                //addonBefore='Date of Birth'
                type='date'
                name='dob'
                //placeholder='Date of Birth'
                //required
                onChange={handleFormChange}
              />
            </Form.Item>
            <p>{'\n'}</p>

            <Form.Item label='Phone Number:'>
            {/* Phone Number (optional for text reminders):{' '} */}
              <Input
                //addonBefore='Phone Number * :'
                type='tel'
                name='phone'
                //placeholder='Phone'
                onChange={handleFormChange}
              />
              
            </Form.Item>
            <label align='left'>Phone number is optional for text reminders</label>
            <p>{'\n'}</p>
            {/* <Button type='primary' htmlType='submit' onClick={handleSubmit}> */}
            <Form.Item>
            <Button type='primary' htmlType='submit'>
              Create Account
            </Button>
            </Form.Item>
          </Form>
          </Card>

          {/* <Card title='Create Account' align='left' span={14}>
            <Form size='large' name='basic' onFinish={handleSubmit}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  { type: 'email', message: 'Not a valid Email!' },
                  { required: true, message: 'Please enter your Email!' }
                ]} 
              >
                <Input onChange={handleEmailChange}  />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please enter your password!' }
                ]} 
              >
                <Input.Password onChange={handlePasswordChange} />
              </Form.Item>

              <Form.Item
                label='First Name'
                name='firstname'
                rules={[
                  { required: true, message: 'Please enter your first name!' }
                ]} 
              >
                <Input onChange={handleFirstNameChange} />
              </Form.Item>

              <Form.Item
                label='Last Name'
                name='lastname'
                rules={[
                  { required: true, message: 'Please enter your last name!' }
                ]} 
              >
                <Input onChange={handleLastNameChange} />
              </Form.Item>

              <Form.Item
                label='Date of Birth'
                name='dob'
                rules={[{ required: true, message: 'Please enter your DOB!' }]}  
              >
                <DatePicker onChange={handleDobChange} />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </Card> */}

        </div>
      </header>
    </div>
  );
};

export default CreateUser;
