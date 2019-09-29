import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components//PrivateRoute';
import Events from './pages/Events';
import Event from './pages/Event';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/events" component={Events} />
    <Route path="/event/:id" component={Event} />
    <PrivateRoute path="/admin" component={AdminPanel} />
    <Redirect to="/events" />
  </Switch>
);


export default Routes;