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

const App = () => {
  const [account, setAccount] = useState('');
  const updateAccount =  (value) => {
    setAccount(value);    
};
  return (
    <div>
      <Switch>
        <UserNavBar exact path='/User' user = {account}/>
        <UserNavBar exact path='/NewAppointment' user = {account}/>
        <UserNavBar exact path='/RescheduleAppointment' user = {account}/>
        <UserNavBar exact path='/Appointment' user = {account}/>
        <UserNavBar exact path='/ContactAndFindUs' user = {account}/>
        <NavBar exact path='' />
      </Switch>
      <Switch>
        <Route exact path='/Home' component={Home} />
        <Route exact path='/User' 
          component={() => <User email={account} />}
        />
        <Route 
          exact path='/CreateUser' 
          component={() => <CreateUser set={e =>updateAccount(e)} />}
        />
        <Route 
          exact path='/Login' 
          component={() => <Login set={e =>updateAccount(e)} />}/>
          <Route exact path="/NewAppointment" component={NewAppointment} />
          <Route exact path="/Admin" component={Admin} />
          <Route exact path="/RescheduleAppointment" component={RescheduleAppointment} />
          <Route exact path="/ContactAndFindUs" component={ContactAndFindUs} />
          <Route exact path="/Appointment" component={Appointment} />

        <Route exact path='/'>
          <Redirect to='/Home' />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );

};

export default App;
