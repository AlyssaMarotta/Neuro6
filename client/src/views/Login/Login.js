import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import { PromiseProvider } from 'mongoose';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [authorized, setAuthorized] = useState(false);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //sourced from https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61
    const login = async () => {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.error);
      }
      
      console.log(body);
      if(body.isAdmin == true)
      {
        props.setAdminAuthorized(true);
      }
      //setAuthorized(true);
      props.setAuthorized(true);
      props.set(email);
    };

    login().catch(err => console.log(err));
  };

  if (props.authorized) return (
    <Redirect to= {props.exactpath} />
  );

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='forum'>
          <form onSubmit={handleSubmit}>
            <label>
              Email:{' '}
              <input
                type='email'
                className='textbox'
                placeholder='Email'
                onChange={handleEmailChange}
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
            <input className='buttons' type='submit' value='Login' />
          </form>
        </div>
      </header>
    </div>
  );
};

export default Login;
