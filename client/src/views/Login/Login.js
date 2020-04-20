import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import { PromiseProvider } from 'mongoose';
import { Col, Card, Form, Input, Button } from 'antd';
import axios from 'axios';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const urls = ['hello-world', '/hello-world', 'http://localhost:5000/hello-world']
    const helloWorld = async (url) => {
      // const response = await axios.get(url);
      // const printText = `RESULT FOR ${url}`;
      // console.log(printText);
      // console.log(response.data);
      const response = await fetch(url, {mode: 'cors'});
      const res2 = response.clone();
      const printText = `RESULT FOR ${url}`;
      try {
        const body = await response.json();
        console.log(printText)
        console.log(body);
      } catch (err) {
        const text = await res2.text();
        console.log(printText);
        console.log(text);
      }
    };
    urls.forEach(url => helloWorld(url).catch(err => console.log(err)));
  }, []);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    // comment out e.preventDefault(); for the Ant Design Form
    //e.preventDefault();
    //sourced from https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61
    const login = async () => {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      });
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.error);
      }

      console.log(body);
      if (body.isAdmin == true) {
        props.setAdminAuthorized(true);
      }
      //setAuthorized(true);
      props.setAuthorized(true);
      props.set(email);
    };

    login().catch(err => console.log(err));
  };

  if (props.authorized) return <Redirect to={'/User'} />;

  return (
    <div className='App'>
      <header className='App-header'>
        <img
          className='FrontImage'
          src={'/UFHealthBuilding.jpg'}
          alt='Uf Health Building'
        />
        <div className='section'>
          {/* <form onSubmit={handleSubmit}>
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
          </form> */}

          <Card title='Login' align='left' span={14}>
            <Form size='large' name='basic' onFinish={handleSubmit}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  { type: 'email', message: 'Not a valid Email!' },
                  { required: true, message: 'Please input your Email!' }
                ]}
              >
                <Input onChange={handleEmailChange} />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}
              >
                <Input.Password onChange={handlePasswordChange} />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </header>
    </div>
  );
};

export default Login;
