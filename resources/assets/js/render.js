
import App from './components/App.js';
import AppNavbar from './components/AppNavbar.js';
import LoginForm from './components/auth/LoginForm.js';
import RegisterForm from './components/auth/RegisterForm.js';

import React from 'react';
import RenderManager from './RenderManager.js';

RenderManager.registerElement('app', <App />);
// RenderManager.registerElement('forgot-password', ?);
RenderManager.registerElement('login', <LoginForm />);
RenderManager.registerElement('navbar-guest', <AppNavbar guest />);
RenderManager.registerElement('navbar-user', <AppNavbar />);
RenderManager.registerElement('register', <RegisterForm />);
// RenderManager.registerElement('reset-password', ?);
