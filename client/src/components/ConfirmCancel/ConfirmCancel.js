import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './ConfirmCancel.css';
import { Button, Card } from 'antd';
import axios from 'axios';
var ObjectId = require('mongoose').Types.ObjectId;

const ConfirmCancel = props => {
  const [submitted, setSubmitted] = useState(false);
  const data = {
    _id: props.data._id,
  };

  const handleDeleteAppointment = () => {
    console.log(JSON.stringify(ObjectId(props.data._id)));
    const deleteAppointment = async () => {
      const response = await axios.delete('/appointments', { id: data._id });
      const body = response.data;
      if (response.status !== 200) {
        throw Error(body.error);
      } else {
        setSubmitted(true);
      }
    };
    deleteAppointment().catch(err => {
      alert('Failed to delete appointment');
      console.log(err);
    });
  };

  if (submitted) return <Redirect to={'/user'} />;
  return (
    <div className='popup'>
      <div className='popup_inner'>
        <Card style={{ background: 'white' }}>
          <h1>Are you sure you want to cancel {props.text}</h1>
          <Link to={'/User'}>
            <Button
              type='primary'
              size='large'
              onClick={handleDeleteAppointment}
            >
              Yes, Cancel
            </Button>
          </Link>

          <Button type='primary' size='large' onClick={props.closePopup}>
            No, Close
          </Button>
        </Card>
      </div>
    </div>
  );
};
export default ConfirmCancel;
