import React from 'react';
import { Link } from 'react-router-dom';
import './CreateUser.css';

function CreateUser() {

   
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='forum'>
          <p>
            <input type='text' placeholder='First Name' />
          </p>
          <p>
            <input type='text' placeholder='Last Name' />
          </p>
          <p>
            <input type='text' placeholder='Email' />
          </p>
          <p>
            <input type='text' placeholder='Username' />
          </p>
          <p>
            <input type='text' placeholder='Password' />
          </p>
          <p>
            <Link className='nav-link' to='/User'>
              Enter
            </Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default CreateUser;
