import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import { PromiseProvider } from 'mongoose';
import { Input } from 'antd';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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
        cookies.set('admin', email);
      }
      //setAuthorized(true);
      cookies.set('account',email);
    };

    login().catch(err => console.log(err));
  };

  if (cookies.get('account') != undefined) return (
    <Redirect to= {props.exactpath} />
  );

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='forum'>
          <form onSubmit={handleSubmit}>
            <label>
              Email:{' '}
              <Input
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
              <Input
                type='password'
                className='textbox'
                placeholder='Password'
                onChange={handlePasswordChange}
                required
              />
            </label>
            <p>{'\n'}</p>
            <Input className='buttons' type='submit' value='Login' />
          </form>
        </div>
      </header>
    </div>
  );
};

export default Login;
