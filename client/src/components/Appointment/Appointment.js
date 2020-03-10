import React from 'react';
import { Link } from 'react-router-dom';
import './Appointment.css';

const Appointment = (props) => {
    return (
        <div className = "Appointment">
            <div className='all'>
            <div className='leftAppointment'>
            <p>props.title</p>
            <p>props.time</p>
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