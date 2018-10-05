// import ForgotPasswordForm from './ForgotPasswordForm.js';
// import ResetPasswordForm from './ResetPasswordForm.js';
import App from './App.js';
import AppNavbar from './AppNavbar.js';
import LoginForm from './auth/LoginForm.js';
import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from './auth/RegisterForm.js';

let AppDiv = document.getElementById('app');
let ForgotPasswordDiv = document.getElementById('forgotpassword');
let GuestNavbarDiv = document.getElementById('navbar-guest');
let LoginDiv = document.getElementById('login');
let RegisterDiv = document.getElementById('register');
let ResetPasswordDiv = document.getElementById('resetpassword');
let UserNavbarDiv = document.getElementById('navbar-user');

if (GuestNavbarDiv) {
  ReactDOM.render(<AppNavbar guest />, GuestNavbarDiv);
} else if (UserNavbarDiv) {
  ReactDOM.render(<AppNavbar />, UserNavbarDiv);
}

if (AppDiv) {
  ReactDOM.render(<App />, AppDiv);
} else if (LoginDiv) {
  ReactDOM.render(<LoginForm />, LoginDiv);
} else if (RegisterDiv) {
  ReactDOM.render(<RegisterForm />, RegisterDiv);
}
