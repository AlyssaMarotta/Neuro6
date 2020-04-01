
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './ConfirmCancel.css';

const ConfirmCancel = (props) => {

  const [submitted, setSubmitted] = useState(false);

  const handleDeleteAppointment = () => {
    console.log("Trying To Delete appointment");
    const deleteAppointment = async () => {
      const response = await fetch('/appointments', {
        method: 'DELETE',
        body: {
          id: props.id
        },
      });
      const body = await response.json();
      if (response.status !== 200) {
        console.log("Failed delete Appointment");
        throw Error(body.error);
      }
      else {
        setSubmitted(true);
      }
    };
    deleteAppointment().catch(err => console.log(err));
  };

  if (submitted) return (
    <Redirect to= {"/user"} />
  );
    return (
        <div className='popup'>
            
        <div className='popup_inner'>
        <h1>Are you sure you want to cancel {props.text}</h1>
        <Link to={'/User'}>
          <button className='buttons' onClick={handleDeleteAppointment}>Yes, Cancel</button>
        </Link>
        
        <button className='buttons' onClick={props.closePopup}>No, Close</button>
        </div>
      </div>
    );
  };
  export default ConfirmCancel;