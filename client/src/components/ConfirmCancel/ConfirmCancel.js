import React from 'react';
import { Link } from 'react-router-dom';
import './ConfirmCancel.css';

const ConfirmCancel = (props) => {
    return (
        <div className='popup'>
            
        <div className='popup_inner'>
        <h1>Are you sure you want to cancel {props.text}</h1>
        <Link to={'/User'}>
        <button className='buttons' onClick={props.closePopup}>Yes, Cancel</button>
        </Link>
        
        <button className='buttons' onClick={props.closePopup}>No, Close</button>
        </div>
      </div>
    );
  };
  export default ConfirmCancel;