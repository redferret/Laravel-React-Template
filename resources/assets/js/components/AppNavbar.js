import AppDispatcher from '../dispatcher.js';
import React from 'react';
import Router from '../router.js';

import {
  LOG_IN,
  LOG_OUT,
  REGISTER,
} from '../constants.js';

import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';

export default class AppNavbar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.renderCheckForGuest = this.renderCheckForGuest.bind(this);
  }

  postLogout() {
    AppDispatcher.dispatch({action: LOG_OUT});
  }

  renderCheckForGuest() {
    if (this.props.guest) {
      return (
        <Nav pullRight>
          <NavItem eventKey={1} href={Router.route(LOG_IN)}>
            Login
          </NavItem>
          <NavItem eventKey={2} href={Router.route(REGISTER)}>
            Register
          </NavItem>
        </Nav>
      );
    } else {
      return (
        <Nav pullRight>
          <NavItem eventKey={1} href='#' onClick={this.postLogout}>
            Logout
          </NavItem>
        </Nav>
      );
    }
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <span>Laravel-React-Template</span>
          </Navbar.Brand>
        </Navbar.Header>
        {this.renderCheckForGuest()}
      </Navbar>
    );
  }
}
