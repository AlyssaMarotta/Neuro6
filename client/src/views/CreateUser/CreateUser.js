import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './CreateUser.css';
import { Input } from 'antd';

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
        <div className='forum'>
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
        </div>
      </header>
    </div>
  );
};

export default CreateUser;
