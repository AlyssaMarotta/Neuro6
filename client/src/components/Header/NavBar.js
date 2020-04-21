import React from 'react';
import { Menu, Row, Col, Layout } from 'antd';
import {
  EnvironmentOutlined,
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/ufhealth.svg';

const NavBar = () => {
  //const LogoIcon = props => <Icon component={Logo} {...props} />;

  const { Header, Content, Footer } = Layout;

  return (
    <Row
      style={{
        backgroundColor: '#041528',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Col align='right' theme='dark' span={4}>
        <Menu margin-bottom='20px' theme='dark' align='center'>
          <Link theme='dark' className='nav-title' to='/'>
            <Logo
              style={{ backgroundColor: '#041528', margin: 5 }}
              // className='nav-logo'
              src={'/NeurosurgeryLogo.gif'}
              alt='Neurosurgery logo'
            />
          </Link>
        </Menu>
      </Col>
      <Col span={10}></Col>
      <Col span={10} margin-bottom='20px' text-align='right'>
        <Menu
          style={{ margin: 'auto' }}
          theme='dark'
          defaultSelectedKeys={['1']}
          mode='horizontal'
          text-align='center'
        >
          <Menu.Item key='home'>
            <Link className='nav-link' to='/Home'>
              <span>
                <HomeOutlined align='center' style={{ fontSize: '130%' }} />
                Home
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key='contact'>
            <Link className='nav-link' to='/ContactAndFindUs'>
              <span>
                <EnvironmentOutlined
                  text-align='center'
                  style={{ fontSize: '130%' }}
                />
                Contact and Find Us
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key='login'>
            <Link className='nav-link' to='/Login'>
              <span>
                <UserOutlined style={{ fontSize: '130%' }} />
                Login
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key='createuser'>
            <Link className='nav-link' to='/CreateUser'>
              <span>
                <UserAddOutlined style={{ fontSize: '130%' }} />
                Create User
              </span>
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
};

export default NavBar;
