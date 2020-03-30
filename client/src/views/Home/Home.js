import React from 'react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import './Home.css';
import { Input } from 'antd';



// <img src={ "/NeurosurgeryLogo.gif" } alt="Uf Health Building" />  {//possibly have logo above the buttons and remove navbar}


const Home = () => {
  return (
    <div className='App'>
     
      <header className='App-header'>
      
        <img className = 'FrontImage' src={ "/UFHealthBuilding.jpg" } alt="Uf Health Building" />
       
        <div className='section'>
          <p>
            <Link to='/Login'>
              <Input className='buttons' type='submit' value='Login' />
            </Link>
          </p>
          <p>
            <Link to='/CreateUser'>
            <Input className='buttons' type='submit' value='Create Account' />
            </Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Home;
