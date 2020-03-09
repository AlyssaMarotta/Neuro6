import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import NotFound from './views/NotFound';
import NavBar from './components/Header/NavBar';
import UserNavBar from './components/UserHeader/UserNavBar';
import CreateUser from './views/CreateUser/CreateUser';
import User from './views/User/User';
import Login from './views/Login/Login';

const App = () => {
  return (
    <div>
      <Switch>
        <UserNavBar exact path='/User' />
        <NavBar exact path='' />
      </Switch>
      <Switch>
        <Route exact path='/Home' component={Home} />
        <Route exact path='/User' component={User} />
        <Route exact path='/CreateUser' component={CreateUser} />4
        <Route exact path='/Login' component={Login} />
        <Route exact path='/'>
          <Redirect to='/Home' />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
