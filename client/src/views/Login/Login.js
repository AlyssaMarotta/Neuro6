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
          <p>
            <input
              type='text'
              placeholder='Username'
              onChange={handleUsernameChange}
            />
          </p>
          <p>
            <input
              type='password'
              placeholder='Password'
              onChange={handlePasswordChange}
            />
          </p>
          <p>
            <Link className='nav-link' to='/User'>
              Enter
            </Link>
            <button onClick={handleSubmit}>sup</button>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Login;
