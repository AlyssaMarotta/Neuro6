import React, { useState } from 'react';
import './CreateUser.css';

function CreateUser() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    //sourced from https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61
    const callBackendAPI = async () => {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password
        })
      });
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    };

    callBackendAPI()
      .then(res => console.log(res)) //this.setState({ data: res.express }))
      .catch(err => console.log(err));
  };


  return (
    <div className='App'>
      <header className='App-header'>
        <div className='forum'>
          <form onSubmit={handleSubmit}>
            <label>
              Email:{' '}
              <input
                className='textbox'
                type='email'
                placeholder='Email'
                required
              />
            </label>
            <p>{'\n'}</p>
            <label>
              Password:{' '}
              <input
                className='textbox'
                type='password'
                placeholder='Password'
                required
              />
            </label>
            <p>{'\n'}</p>
            <label>
              First Name:{' '}
              <input
                className='textbox'
                type='text'
                placeholder='First Name'
                required
              />
            </label>
            <p>{'\n'}</p>
            <label>
              Last Name:{' '}
              <input
                className='textbox'
                type='text'
                placeholder='Last Name'
                required
              />
            </label>
            <p>{'\n'}</p>

            <label>
              Date of Birth:{' '}
              <input
                className='textbox'
                type='date'
                placeholder='Date of Birth'
                required
              />
            </label>
            <p>{'\n'}</p>
            <input className='buttons' type='submit' value='Create Account' />
          </form>
        </div>
      </header>
    </div>
  );
}

export default CreateUser;
