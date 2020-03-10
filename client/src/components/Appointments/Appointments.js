import React from 'react';
import { Link } from 'react-router-dom';
import './Appointments.css';
import Appointment from '../Appointment/Appointment'

const Appointments = () => {
    return (
        <div className = "Appointments">
            Appointments
            <Appointment />
            <Appointment />
        </div>
    )
};
export default Appointments;