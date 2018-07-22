import React from 'react';
import { Route } from 'react-router';

import App from './App';
// import NotFoundPage from './components/pages/not-found-page';
// import HomePage from './components/pages/home-page';
// import Register from './components/auth/register';
import Login from './components/auth/login';
// import Dashboard from './components/dashboard';
import requireAuth from './components/auth/require-auth';

/*
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="*" component={NotFoundPage} />
    */

export default (
  <div>
    <Route path="/home" component={requireAuth(App)} />
    <Route path="/login" component={Login} />
  </div>
);
