import React from 'react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import './Home.css';



// <img src={ "/NeurosurgeryLogo.gif" } alt="Uf Health Building" />  {//possibly have logo above the buttons and remove navbar}


function Home() {
  return (
    <div className='App'>
     
      <header className='App-header'>
      
        <img className = 'FrontImage' src={ "/UFHealthBuilding.jpg" } alt="Uf Health Building" />
       
        <div className='section'>
          <p>
            <Link to='/Login'>
              <button className='buttons'>Login</button>
            </Link>
          </p>
          <p>
            <Link to='/CreateUser'>
              <button className='buttons'>Create Account</button>
            </Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Home;
