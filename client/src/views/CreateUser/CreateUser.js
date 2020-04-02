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
  const [formData, setFormData] = useState(initForm);
  const [authorized, setAuthorized] = useState(false);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    //sourced from https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61
    const createAccount = async () => {
      const response = await fetch('/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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

  if (authorized) return <Redirect to='/User' />;

  return (
    <div className='App'>
      <header className='App-header'>
        <img
          className='FrontImage'
          src={'/UFHealthBuilding.jpg'}
          alt='Uf Health Building'
        />
        <div className='section'>
          <form onSubmit={handleSubmit}>
            <label>
              Email:{' '}
              <Input
                className='textbox'
                type='email'
                name='email'
                placeholder='Email'
                required
                onChange={handleFormChange}
              />
            </label>
            <p>{'\n'}</p>
            <label>
              Password:{' '}
              <Input
                className='textbox'
                type='password'
                name='password'
                placeholder='Password'
                required
                onChange={handleFormChange}
              />
            </label>
            <p>{'\n'}</p>
            <label>
              First Name:{' '}
              <Input
                className='textbox'
                type='text'
                name='firstName'
                placeholder='First Name'
                required
                onChange={handleFormChange}
              />
            </label>
            <p>{'\n'}</p>
            <label>
              Last Name:{' '}
              <Input
                className='textbox'
                type='text'
                name='lastName'
                placeholder='Last Name'
                required
                onChange={handleFormChange}
              />
            </label>
            <p>{'\n'}</p>

            <label>
              Date of Birth:{' '}
              <Input
                className='textbox'
                type='date'
                name='dob'
                placeholder='Date of Birth'
                required
                onChange={handleFormChange}
              />
            </label>
            <p>{'\n'}</p>
            <Input className='buttons' type='submit' value='Create Account' />
          </form>

          {/* <Card title='Create Account' align='left' span={14}>
            <Form size='large' name='basic' onFinish={handleSubmit}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  { type: 'email', message: 'Not a valid Email!' },
                  { required: true, message: 'Please enter your Email!' }
                ]} onChange={handleFormChange} 
              >
                <Input name='email' />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please enter your password!' }
                ]} onChange={handleFormChange} 
              >
                <Input.Password name='password' />
              </Form.Item>

              <Form.Item
                label='First Name'
                name='firstname'
                rules={[
                  { required: true, message: 'Please enter your first name!' }
                ]} onChange={handleFormChange}
              >
                <Input name='firstname'/>
              </Form.Item>

              <Form.Item
                label='Last Name'
                name='lastname'
                rules={[
                  { required: true, message: 'Please enter your last name!' }
                ]} onChange={handleFormChange}
              >
                <Input name='lastname'/>
              </Form.Item>

              <Form.Item
                label='Date of Birth'
                name='dob'
                rules={[{ required: true, message: 'Please enter your DOB!' }]} onChange={handleFormChange} 
              >
                <DatePicker 
                name='dob'
                />
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
