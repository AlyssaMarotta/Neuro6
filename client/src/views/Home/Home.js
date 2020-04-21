import React from 'react';
import logo from '../../assets/logo.svg';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './Home.css';
import { Layout, Input, Card } from 'antd';

const { Header, Content, Footer } = Layout;

// <img src={ "/NeurosurgeryLogo.gif" } alt="Uf Health Building" />  {//possibly have logo above the buttons and remove navbar}

const Home = () => {
  return (
    <div className='App' style={{ zIndex: '1' }}>
      <header className='App-header'>
        <img
          className='FrontImage'
          src={'/UFHealthBuilding.jpg'}
          alt='Uf Health Building'
        />
        {/* <div className='Image-background'> */}
        <div style={{ position: 'absolute' }}>
          {/* <div className='section'> */}

          <Content style={{ padding: '0 4px' }}>
            <Card align='center'>
              <p>
                <p> </p>
                <Link to='/Login'>
                  <Button color='red' type='primary' size='large'>
                    Login
                  </Button>
                </Link>
              </p>
              <p>
                <p> </p>
              </p>
              <p>
                <Link to='/CreateUser'>
                  <Button type='primary' size='large'>
                    Create Account
                  </Button>
                </Link>
              </p>
              <p> </p>
            </Card>
          </Content>
        </div>
        {/* </div> */}
      </header>
    </div>
  );
};

export default Home;
