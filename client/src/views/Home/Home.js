import React from 'react';
import logo from '../../assets/logo.svg';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './Home.css';
import { Input, Card } from 'antd';



// <img src={ "/NeurosurgeryLogo.gif" } alt="Uf Health Building" />  {//possibly have logo above the buttons and remove navbar}


const Home = () => {
  return (
    <div className='App'>
     
      <header className='App-header'>
      
        <img className = 'FrontImage' src={ "/UFHealthBuilding.jpg" } alt="Uf Health Building" />
       
        <div className='section'>
        <Card align='center'>
          <p>
            <Link to='/Login'>
              <Button color='red' type='primary' size='large' >Login</Button>
            </Link>
          </p>
          <p>
            <Link to='/CreateUser'>
            <Button type='primary' size='large'>Create Account</Button>
            </Link>
          </p>
          </Card>
        </div>
      </header>
    </div>
  );
}

export default Home;
