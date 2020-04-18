import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './AppointmentPageAdmin.css';
import ConfirmCancel from '../ConfirmCancel/ConfirmCancel'
import { Input, Button, Modal, Form,  Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
var ObjectId = require('mongoose').Types.ObjectId; 

const AppointmentPageAdmin = (props) => {

    const { patientEmail, title, time, location, reminders, _id } = props.data
    const [showPopup, setPopup] = useState(false);
    const [showEdit, setEdit] = useState(false);
    const [patientEmailS, setPatientEmailS] = useState(patientEmail);
    const [titleS, setTitleS] = useState(title);
    const [timeS, setTimeS] = useState(time);
    const [locationS, setLocationS] = useState(location);
    const [remindersS, setRemindersS] = useState(reminders);

    const updateTitleS = e => 
    {
        console.log(e.target.value);
        setTitleS(e.target.value);
    }

    const initForm = {
            patientEmail: patientEmailS,
            title: titleS,
            time: timeS,
            location: locationS,
            reminders: remindersS
      };
    
    // const [formData, setFormData] = useState(initForm);
    
    // const handleFormChange = e => {
    //   const { name, value } = e.target;
    //   setFormData(formData => ({
    //     ...formData,
    //     [name]: value
    //   }));
    // };

    const togglePopup = e => {
        setPopup(!showPopup);
    }

    const toggleEdit = e => {
        setEdit(!showEdit);
    }

    const onCreate = values => {
        console.log('Received values of form: ', values);
        props.setVisible(false);
    };

    const [form] = Form.useForm();

    const cancel = () => {
        setTitleS(title);
        props.onCancel();
    }

    //working
    const handleUpdateAppointment = () => {
        console.log(JSON.stringify(ObjectId(_id)));
        console.log(initForm);
        const updateAppointment = async () => {
        console.log("got heer");
          const response = await fetch('/appointments', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({id: _id, newAppt: initForm}),
          });
          const body = await response.json();
          if (response.status !== 200) {
            console.log("Failed update Appointment");
            throw Error(body.error);
          }
          console.log(body);
          console.log(remindersS);
          props.onCancel();
        };
        updateAppointment().catch(err => console.log(err));
      };


      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };


      // reset form fields when modal is form, closed
// const useResetFormOnCloseModal = ({ form, visible }) => {
//     const prevVisibleRef = useRef();
//     useEffect(() => {
//       prevVisibleRef.current = visible;
//     }, [visible]);
//     const prevVisible = prevVisibleRef.current;

//     useEffect(() => {
//         if (!visible && prevVisible) {
//           form.resetFields();
//         }
//       }, [visible]);
//     };

    return (
        <Modal
            visible={props.visible}
            title="Create a new collection"
            okText="Update"
            cancelText="Cancel"
            onCancel={cancel}
            onOk={() => {
            handleUpdateAppointment();
            // form
            //     .validateFields()
            //     .then(values => {
            //     form.resetFields();
            //     onCreate(values);
            //     })
            //     .catch(info => {
            //     console.log('Validate Failed:', info);
            //     });
            }}
        >
        {patientEmail}
        <p>{title}</p>
            <p>{moment(time).format('MMMM Do, YYYY @ h:mm a')}</p>
            <p>{reminders}</p>
            <p>{location}</p>
            <Button type='primary' size='large' onClick={togglePopup}>Cancel Appointment</Button>
            {showPopup ?
                <ConfirmCancel
                text= {title}
                closePopup={togglePopup}
                data= {props.data}
                />
                : null
            }
            <p></p>
            <Button type='primary' size='large' onClick={toggleEdit}>Edit Appointment</Button>
            <p></p>
            {showEdit ?
            (
            <div>
            <Input
                className='textbox'
                type='title'
                name='title'
                placeholder= 'title'
                defaultValue= {titleS}
                required
                onChange={e => updateTitleS(e)}
            />
            <p></p>
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} >
            <Form.List name="names">
                { 
                (reminders, { add, remove }) => {
                    // add and remove does not work reminders is the array that add and remove are linked to but the actual array used is remindersS
                return (
                    <div>
                    {remindersS.map((reminder, index) => (
                        <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Reminders' : ''}
                        required={false}
                        key={reminder.key}
                        >
                        <Form.Item
                            {...reminder}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Please input the reminder or delete this field.",
                            },
                            ]}
                            noStyle
                        >
                            <Input placeholder="reminder" defaultValue = {reminder} style={{ width: '80%' }} />
                        </Form.Item>
                        {remindersS.length > 1 ? (
                            <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                remove(reminder.name);
                            }}
                            />
                        ) : null}
                        </Form.Item>
                    ))}
                    <Form.Item>
                        <Button
                        type="dashed"
                        onClick={() => {
                            add();
                        }}
                        style={{ width: '60%' }}
                        >
                        <PlusOutlined /> Add field
                        </Button>
                    </Form.Item>
                    </div>
                );
                }}
            </Form.List>
            </Form>
            </div> 
            ): null
        }
    </Modal>
    );
};
export default AppointmentPageAdmin;