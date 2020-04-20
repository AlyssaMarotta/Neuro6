import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Card, Alert, PageHeader, Statistic } from 'antd';
import moment from 'moment';

import './Reminders.css';
import Reminder from '../Reminder/Reminder';

// TODO: Fetch reminders based on user context
const Reminders = props => {
  const { appointment } = props;
  const { reminders, time, title } = appointment;
  console.log(props);
  return (
    // <div className='Reminders'>
    <div>
      <PageHeader
        title={title && `Reminders for ${title}`}
      >
        {time && <Statistic value={moment(time).format('LLLL')} />}
      </PageHeader>
        {/* Reminders */}
      {reminders ?
        reminders.map((reminder, index) => (
          <Reminder
            time={time}
            title={title}
            reminder={reminder} 
          />
        )) : <p>No reminders. You're all set!</p>}
    </div>
    //   <Alert style ={{margin: 10}}
    //   message="Reminder"
    //   description="Be on time for your meeting tomorrow"
    //   type="error"
    // />
  );
};
export default Reminders;
