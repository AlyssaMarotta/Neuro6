import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './AppointmentPageAdmin.css';
import ConfirmCancel from '../ConfirmCancel/ConfirmCancel'
import { Input, Button, Modal, Form,  Radio } from 'antd';

const AppointmentPageAdmin = (props) => {

    const { patientEmail, title, time, location, reminders, _id } = props.data
    const [showPopup, setPopup] = useState(false);

    const togglePopup = e => {
        setPopup(!showPopup);
    }

    const onCreate = values => {
        console.log('Received values of form: ', values);
        props.setVisible(false);
    };

    const [form] = Form.useForm();

    return (
        <Modal
        visible={props.visible}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={props.onCancel}
        onOk={() => {
        form
            .validateFields()
            .then(values => {
            form.resetFields();
            onCreate(values);
            })
            .catch(info => {
            console.log('Validate Failed:', info);
            });
        }}
    >
        {props.data.patientEmail}
        <p>{title}</p>
            <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
            <p>{reminders}</p>
            <p>{location}</p>
            <Input onClick = {togglePopup} value = "Cancel Appointment"/>
            {showPopup ?
                <ConfirmCancel
                text= {title}
                closePopup={togglePopup}
                data= {props.data}
                />
                : null
            }
            
    </Modal>
    );
};
export default AppointmentPageAdmin;