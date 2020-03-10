import React from 'react';
import { Link } from 'react-router-dom';
import './UserNavBar2.css';

const UserNavBar2 = () => {
  return (
    <div className='header'>
      {/* Page Links */}
      <div className='user-nav-items'>
        <Link className='user-nav-link' to='#'>
          Reminders
        </Link>
        <Link className='user-nav-link' to='/Home'>
          Find Us
        </Link>
        <Link className='user-nav-link' to='/Home'>
          Contact Us
        </Link>
        <Link className='user-nav-link' to='/Home'>
          Print
        </Link>
      </div>
    </div>
  );
};
export default UserNavBar2;
