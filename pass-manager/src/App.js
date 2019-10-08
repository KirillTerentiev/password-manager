import React from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import PasswordSideBar from './components/PasswordSideBar'
import Login from './components/Login'
import {AuthProvider} from "./components/Auth";
import {PrivateRoute} from "./components/PrivateRoute";
import Registration from "./components/Registration";
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <div className="links">
          <Link to="/dashboard">
            Dashboard
          </Link>
          <Link to="/registration">
            Registration
          </Link>
        </div>
        <Switch>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/dashboard" component={PasswordSideBar}/>
          <Route path="/registration" component={Registration}/>
          <Redirect to="/registration"/>
        </Switch>
      </div>
    </AuthProvider>
  );
};

export default App;
