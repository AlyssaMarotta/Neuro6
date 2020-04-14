import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Appointment.css';
import AppointmentPageComp from '..//..//components/AppointmentPageComp/AppointmentPageComp';



function Appointment(props) {

  const {email} = props;
  const [appointments, setAppointments] = useState([]);
  let filteredAppointments;

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo,  setDateTo] = useState(new Date(new Date().setDate(new Date().getDate() + 120)));

  useEffect(() => {
    if (!email) return;
    // TODO: Fetch appointments with backend endpoint
    const getAppointments = async () => {
      const response = await fetch(`/appointments/${email}`, {
        // TODO: Find out how to actually send the authorized email/password
        headers: {
          'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l',
          'Cache-Control': 'no-cache',
        }
      });
      try {
        const body = await response.json();
        if (response.status !== 200) throw Error(body.error);
        console.log(body);
        setAppointments(body.appointments || []);
        
      } catch {
        throw Error(await response.clone().text());
      }

    };
    // setAppointments([dummyData]);
    getAppointments().catch(err => console.log(err));
  }, [email]);

  let filteredDateAppointments = appointments.filter(
    (directory) => {
        return  moment(directory.time).isBetween(dateFrom, dateTo);
    });

  const appointmentList = filteredDateAppointments.map((appointment, index) => 
    {
      if(index == props.match.params.value)
      {
            return(
              <div className='App'>
                <header className='App-header'> 
                  <AppointmentPageComp key={index} data={appointment} id = {index} />
                </header>
              </div>
            );
      }
    }
      );
        
        
      return <div>{appointmentList}</div>; 
      
};

export default Appointment;

/*{appointments(props.id)((appointment, index) => (
  appointment.title
))}


filteredAppointments = appointments.filter(
    (appointment) => {
        return appointment.indexOf(props.match.params.value) !== -1; //Search  
    }
);*/

//{props.match.params.value}
