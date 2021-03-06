import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './CreateUserAdmin.css';
import { Input, Button, Modal, Form, Radio } from 'antd';
import axios from 'axios';

const CreateUserAdmin = props => {
  const initForm = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
  };

  const [formData, setFormData] = useState(initForm);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    //sourced from https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61
    const createAccount = async () => {
      const response = await axios.post('/create-account', formData);
      const body = response.data;

      if (response.status !== 200) {
        throw Error(body.error);
      }

      console.log(body);
      props.onCancel();
    };

    createAccount().catch(err => {
      alert('There was an error with creating your account');
      console.log(err);
    });
  };

  return (
    <Modal
      visible={props.visible}
      title='Create a new user'
      okText='Create'
      cancelText='Cancel'
      onCancel={props.onCancel}
      onOk={() => handleSubmit()}
    >
      <form>
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
            minLength={8}
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

        <label>
          Phone Number (optional for text reminders):{' '}
          <Input
            className='textbox'
            type='tel'
            name='phone'
            placeholder='Phone'
            onChange={handleFormChange}
          />
        </label>
        <p>{'\n'}</p>
        {/* <Input className='buttons' type='submit' value='Create Account' /> */}
      </form>
    </Modal>
  );
};
export default CreateUserAdmin;
