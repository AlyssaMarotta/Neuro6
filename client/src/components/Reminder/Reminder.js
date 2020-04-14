import React, { useState, useEffect } from 'react';
import {Alert} from 'antd';
import { Link } from 'react-router-dom';
import './Reminder.css';

const Reminder = props => {
  const { children } = props;

  return (
    <div className='Reminder'>
      <Alert
      message="Appointment Reminder"  
      description={props.reminder}
      type="info"
      showIcon
      align='left'
    />
      {/* <p>{children}</p> */}
    </div>
  );
};
export default Reminder;
