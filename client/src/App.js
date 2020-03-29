import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import NotFound from './views/NotFound';
import NavBar from './components/Header/NavBar';
import UserNavBar from './components/UserHeader/UserNavBar';
import CreateUser from './views/CreateUser/CreateUser';
import User from './views/User/User';
import Login from './views/Login/Login';
import NewAppointment from './views/NewAppointment/NewAppointment';
import Admin from './views/Admin/Admin';
import RescheduleAppointment from './views/RescheduleAppointment/RescheduleAppointment';
import ContactAndFindUs from './views/ContactAndFindUs/ContactAndFindUs';
import Appointment from './views/Appointment/Appointment';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const PrivateRoute = ({ component: Component, authorized: auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.get('account') != undefined
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: {exactpath: rest[0]}  // TODO: Pass in a state of where they were going so it wouldnt have to bring them to user page.
    }} />
  )} />
)
const PrivateHomeRoute = ({ component: Component, authorized: auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.get('account') != undefined
      ?  <Redirect to='/User'/>
      : <Component {...props}/>
  )} />
)

const PrivateAdminRoute = ({ component: Component, adminAuthorized: adminAuth, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.get('admin')!= undefined
      ?  <Redirect to='/Admin'/>
      : <PrivateRoute component= {Component} {...props}/>
  )} />
)


const DecideNavBar = () => {
  if (cookies.get('account') != undefined) {
    return <UserNavBar 
      exact path='' />;
  }
  return <NavBar exact path='' />;
}


const App = (props) => {
  return (
    <div>
      <Switch>
        <DecideNavBar/>
      </Switch>
      <Switch>
        <PrivateHomeRoute exact path='/Home' component={Home} />
        <Route exact path="/ContactAndFindUs" component={ContactAndFindUs} />
        <Route 
          exact path='/CreateUser' 
          component={() => 
          <CreateUser />}
        />
        <Route 
          exact path='/Login' 
          component={() => 
          <Login exactpath = {'/User'}/>}
        />
        <PrivateAdminRoute exact path='/User' 
          component={() => <User/>}
        />
        <PrivateRoute exact path="/NewAppointment" component={NewAppointment}/>
        <PrivateRoute exact path="/Admin" component={Admin} />
        <PrivateRoute exact path="/RescheduleAppointment" component={RescheduleAppointment} />
        
        <PrivateRoute exact path="/Appointment/:value" component={(matchProps) => <Appointment {...matchProps} {...props}/>} />

        <Route exact path='/'>
          <Redirect to='/Home' />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );

};

export default App;
