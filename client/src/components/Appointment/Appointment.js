import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Appointment.css';
import { Button, Card, Row, Col } from 'antd';

const Appointment = props => {
  const { patientEmail, title, time, location, reminders } = props.data;

  return (
    // <div className='Appointment'>
    //   <div className='all'>
    //     <div className='leftAppointment'>
    //       <p>{title}</p>
    //       <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
    //     </div>
    //     <div className='rights'>
    //       <Link to={'/Appointment/' + props.id}>
    //         <Button type='primary'>More Details</Button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <Card align='left' type='inner' title={title} hoverable='true'>
      <Row>
        <Col>
          <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
          <Link to={'/Appointment/' + props.id}>
            <Button type='primary'>More Details</Button>
          </Link>
        </Col>
      </Row>
    </Card>
  );
};
export default Appointment;
