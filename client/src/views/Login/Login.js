import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
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

      console.log(res);
    };

    callBackendAPI().catch(err => console.log(err));
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='forum'>
          <form onSubmit={handleSubmit}>
            <label>
              Username:{' '}
              <input
              type='text'
              className='textbox'
              placeholder='Username'
              onChange={handleUsernameChange}
              required
            />
            </label>
            <p>{'\n'}</p>
            <label>
              Password:{' '}
              <input
              type='password'
              className='textbox'
              placeholder='Password'
              onChange={handlePasswordChange}
              required
            />
            </label>
            <p>{'\n'}</p>
            <input className='buttons' type='submit' value='Login'/>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Login;
