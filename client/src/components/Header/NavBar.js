import React from 'react';
import { Menu, Row, Col } from 'antd';
import {
  EnvironmentOutlined,
  HomeOutlined,
  UserOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/ufhealth.svg';

const NavBar = () => {
  //const LogoIcon = props => <Icon component={Logo} {...props} />;

  return (


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
            <Logo
              style={{ backgroundColor: '#041528' }}
              // className='nav-logo'
              // src={'/NeurosurgeryLogo.gif'}
              // alt='Neurosurgery logo'
            />
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

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css';

// import { Button } from 'antd';

// const NavBar = () => {
//   return (
//     <div className='header'>
//       {/* Logo */}

//       <div>
//         <Link className='nav-link' to='/Home'>
//           <Button type='primary'>Home</Button>
//         </Link>

//         <Button>Default</Button>
//         <Button type='dashed'>Dashed</Button>
//         <Button type='link'>Link</Button>
//       </div>
//       <Link className='nav-title' to='/'>
//         <img
//           className='nav-logo'
//           src={'/NeurosurgeryLogo.gif'}
//           alt='Neurosurgery logo'
//         />
//       </Link>

//       {/* Page Links */}
//       <div className='nav-items'>
//         <Link className='nav-link' to='/ContactAndFindUs'>
//           Contact and Find Us
//         </Link>

//         <Link className='nav-link' to='/Login'>
//           Login
//         </Link>
//         <Link className='nav-link' to='/CreateUser'>
//           Create Account
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default NavBar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css';

// const NavBar = () => {
//   return (
//     <div className='header'>
//       {/* Logo */}
//       <Link className='nav-title' to='/'>
//         <img
//           className='nav-logo'
//           src={'/NeurosurgeryLogo.gif'}
//           alt='Neurosurgery logo'
//         />
//       </Link>

//       {/* Page Links */}
//       <div className='nav-items'>
//         <Link className='nav-link' to='/Home'>
//           Home
//         </Link>
//         <Link className='nav-link' to='/ContactAndFindUs'>
//           Contact and Find Us
//         </Link>

//         <Link className='nav-link' to='/Login'>
//           Login
//         </Link>
//         <Link className='nav-link' to='/CreateUser'>
//           Create Account
//         </Link>
//       </div>
//     </div>
//   );
// };
// /*

//                 <Link className = "nav-link" to='/Register'>Extra Page</Link>
//                 <a className = "nav-link" target='_blank' rel="noopener noreferrer" href="https://reactjs.org/docs/getting-started.html">
//                     React Docs
//                 </a>
//                 <a className = "nav-link" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/tutorial/tutorial.html">React Tutorial</a>
//                 <a className = "nav-link" target="_blank" rel="noopener norefferer" href="https://nodejs.org/en/docs/">Node Docs</a>
// */
// export default NavBar;
