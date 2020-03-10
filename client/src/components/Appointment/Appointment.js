import React from 'react';
import { Link } from 'react-router-dom';
import './Appointment.css';

const Appointment = () => {
    return (
        <div className = "Appointment">
            <div className='all'>
            <div className='leftAppointment'>
            <p>First Visit Appointment</p>
            <p>January 13, 2018 @ 3:00pm</p>
            </div>
                <div className ="rights">
                <Link to='/Login'>
                    <button className="buttons">More Details</button>
                </Link>
                </div>
            </div>
        </div>
    )
};
export default Appointment;