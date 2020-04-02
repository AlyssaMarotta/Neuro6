import React from 'react';
import { Menu, Row, Col } from 'antd';
import {
  EnvironmentOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/ufhealth.svg';

const NavBar = props => {
  const logout = e => {
    props.updateAuthorization(false);
    props.updateAdminAuthorization(false);
    props.updateAccount('');
    return;
  };

  return (
    // <div className='header'>
    //   {/* Logo */}

    //   <Link className='nav-title' to='/'>
    //     <img
    //       className='nav-logo'
    //       src={'/NeurosurgeryLogo.gif'}
    //       alt='Neurosurgery logo'
    //     />
    //   </Link>

    //   {/* Page Links */}

    //   <div className='nav-items'>
    //     <Link className='nav-link' to='/ContactAndFindUs'>
    //       Contact and Find Us
    //     </Link>
    //     <Link className='nav-link' to='#'>
    //       {' '}
    //       {props.user}{' '}
    //     </Link>
    //     <div onClick={logout} className='nav-link' to='/Home'>
    //       Log Out
    //     </div>
    //   </div>
    //   </div>

      <Row
        style={{
          backgroundColor: '#041528',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Col align='right' theme='dark' span={4}>
          <Menu margin-bottom='20px' theme='dark' align='center'>
            <Link theme='dark' className='nav-title' to='/'>
              <Logo style={{ backgroundColor: '#041528' , margin : 5 }} />
            </Link>
          </Menu>
        </Col>
        <Col span={20} margin-bottom='20px' text-align='right'>
          <Menu
            style={{ margin: 'auto' }}
            theme='dark'
            defaultSelectedKeys={['1']}
            mode='horizontal'
            text-align='center'
          >
            <Menu.Item key='contact'>
              <Link className='nav-link' to='/ContactAndFindUs'>
                {' '}
                <span>
                  <EnvironmentOutlined
                    text-align='center'
                    style={{ fontSize: '130%' }}
                  />
                  Contact and Find Us
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key='user'>
              <Link className='nav-link' to='#'>
                {' '}
                {props.user}{' '}
              </Link>
            </Menu.Item>
            <Menu.Item key='logout' onClick={logout} className='nav-link' to='/Home'>
              <Link className='nav-link' to='/Login'>
                <span>
                  <LogoutOutlined text-align='center' style={{ fontSize: '130%' }} />
                    Log Out
                </span>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
  );
};
export default NavBar;
