import React from 'react';
import { Link } from 'react-router-dom';
import './Appointments.css';
import Appointment from '../Appointment/Appointment'

const Appointments = (props) => {
    let filteredAppointments = props.data.filter(   //can leave it as props.data and insert above or pull it from the database here
        (appointments) => {
            return appointments.email.indexof(props.email) !==1;
        }
    )
    const AppointmentList = filteredAppointments.map(appointments => { 
    return (
        <div className = "Appointments">
            Appointments
            <p key={appointments.title}>
                <Appointment 
                    title = {appointments.title} 
                    time = {appointments.time} 
                    locations = {appointments.locations} 
                    reminders = {appointments.reminders}
                />
            </p>
            
            <Appointment />
        </div>
    )
    });
    return <div>{AppointmentList}</div>;
};
export default Appointments;