import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Appointment.css';
import AppointmentPageComp from '..//..//components/AppointmentPageComp/AppointmentPageComp';

function Appointment(props) {
  console.log(props);
  // alert('sup')
  const { email } = props;
  const [appointment, setAppointment] = useState([]);
  let filteredAppointments;

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(
    new Date(new Date().setDate(new Date().getDate() + 120))
  );

  useEffect(() => {
    if (!email) return;
    console.log('is anybody out there');
    // TODO: Fetch appointments with backend endpoint
    const getAppointments = async () => {
      console.log(props);
      const response = await fetch(`/appointment/${props.match.params.id}`);
      const res2 = response.clone();
      try {
        const body = await response.json();
        console.log('OMG IT IS THE BODY');
        if (response.status !== 200) throw Error(body.error);
        console.log('No errors pog')
        console.log(body);
        setAppointment(body);
      } catch {
        throw Error(await res2.text());
      }
    };
    // setAppointments([dummyData]);
    getAppointments().catch((err) => console.log(err));
  }, [email]);

  return (
    <div className='App'>
      <header className='App-header'>
        <AppointmentPageComp data={appointment} id={appointment.id} />
      </header>
    </div>
  );
}

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
