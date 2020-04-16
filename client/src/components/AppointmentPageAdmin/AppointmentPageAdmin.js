import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './AppointmentPageAdmin.css';
import ConfirmCancel from '../ConfirmCancel/ConfirmCancel'
import { Input, Button, Modal, Form,  Radio } from 'antd';
var ObjectId = require('mongoose').Types.ObjectId; 

const AppointmentPageAdmin = (props) => {

    const { patientEmail, title, time, location, reminders, _id } = props.data
    const [showPopup, setPopup] = useState(false);
    const [patientEmailS, setPatientEmailS] = useState(patientEmail);
    const [titleS, setTitleS] = useState(title);
    const [timeS, setTimeS] = useState(time);
    const [locationS, setLocationS] = useState(location);
    const [remindersS, setremindersS] = useState(reminders);

    const updateTitleS = e => 
    {
        console.log(e.target.value);
        setTitleS(e.target.value);
    }

    const initForm = {
            patientEmail: patientEmailS,
            title: titleS,
            time: timeS,
            location: locationS,
            reminders: remindersS
      };
    
    // const [formData, setFormData] = useState(initForm);
    
    // const handleFormChange = e => {
    //   const { name, value } = e.target;
    //   setFormData(formData => ({
    //     ...formData,
    //     [name]: value
    //   }));
    // };

    const togglePopup = e => {
        setPopup(!showPopup);
    }

    const onCreate = values => {
        console.log('Received values of form: ', values);
        props.setVisible(false);
    };

    const [form] = Form.useForm();

    const cancel = () => {
        setTitleS(title);
        props.onCancel();
    }

    //working
    const handleUpdateAppointment = () => {
        console.log(JSON.stringify(ObjectId(_id)));
        console.log(initForm);
        const updateAppointment = async () => {
        console.log("got heer");
          const response = await fetch('/appointments', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({id: _id, newAppt: initForm}),
          });
          const body = await response.json();
          if (response.status !== 200) {
            console.log("Failed update Appointment");
            throw Error(body.error);
          }
          console.log(body);
          props.onCancel();
        };
        updateAppointment().catch(err => console.log(err));
      };

    return (
        <Modal
        visible={props.visible}
        title="Create a new collection"
        okText="Update"
        cancelText="Cancel"
        onCancel={cancel}
        onOk={() => {
        handleUpdateAppointment();
        // form
        //     .validateFields()
        //     .then(values => {
        //     form.resetFields();
        //     onCreate(values);
        //     })
        //     .catch(info => {
        //     console.log('Validate Failed:', info);
        //     });
        }}
    >
        {patientEmail}
        <p>{title}</p>
            <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
            <p>{reminders}</p>
            <p>{location}</p>
            <Button type='primary' size='large' onClick={togglePopup}>Cancel Appointment</Button>
            {showPopup ?
                <ConfirmCancel
                text= {title}
                closePopup={togglePopup}
                data= {props.data}
                />
                : null
            }
            <Input
                className='textbox'
                type='title'
                name='title'
                placeholder= 'title'
                required
                onChange={e => updateTitleS(e)}
            />
    </Modal>
    );
};
export default AppointmentPageAdmin;