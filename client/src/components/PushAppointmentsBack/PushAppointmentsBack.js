import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './PushAppointmentsBack.css';
import { Input, Button, Modal, Form, Radio, Select, Alert } from 'antd';
import axios from 'axios';

const { Option } = Select;

const PushAppointmentsBack = props => {
  const [time, setTime] = useState(0);

  const handleSubmit = e => {
    const pushBack = async () => {
      const response = await axios.post('delay-appointments', { time });
      const body = response.data;

      if (response.status !== 200) {
        throw Error(body.error);
      }

      alert(`All appointments for today successfully pushed back ${time / 60000} minutes`);

      console.log(body);
      props.onCancel();
    };

    pushBack().catch(err => console.log(err));
  };
  function onChange(value) {
    setTime(value);
    console.log(`selected ${value}`);
  }

  return (
    <Modal
      visible={props.visible}
      title='Push All Apointments Back'
      okText='Submit'
      cancelText='Cancel'
      onCancel={props.onCancel}
      onOk={() => handleSubmit()}
    >
      <Select
        style={{ width: 200 }}
        placeholder='Select an amount of Time'
        onChange={onChange}
      >
        <Option value={600000}>10 minutes</Option>
        <Option value={1200000}>20 minutes</Option>
        <Option value={1800000}>30 minutes</Option>
        <Option value={2400000}>40 minutes</Option>
        <Option value={3000000}>50 minutes</Option>
        <Option value={3600000}>1 hour</Option>
        <Option value={5400000}>1 hour 30 minutes</Option>
      </Select>
    </Modal>
  );
};
export default PushAppointmentsBack;
