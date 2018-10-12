import AppDispatcher from '../../dispatcher.js';
import AuthStore from '../../stores/AuthStore.js';
import Input from '../Input.js';
import React from 'react';
import Router from '../../router.js';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FORM
} from '../../constants.js';

export default class ResetPasswordForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.sendResetPassword = this.sendResetPassword.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);

    this.state = {
    }
  }

  _onChange() {
    let newValues = this.state.values;
    newValues['email'] = '';

    this.setState({
      errors: AuthStore.getErrors(),
      status: AuthStore.getStatus(),
      message: AuthStore.getMessage(),
      values: newValues
    });
    AuthStore.reset();
  }

  componentDidMount() {
    AuthStore.on(RESET_PASSWORD_FORM, this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeListener(RESET_PASSWORD_FORM, this._onChange.bind(this));
  }

  handleInputChanged(event) {
    let values = this.state.values;
    values[event.target.name] = event.target.value;
    this.setState({
      values: values
    });
  }

  sendResetPassword() {
    AppDispatcher.dispatch({
      action: RESET_PASSWORD_REQUEST,
      values: this.state.values,
      emitOn: [{
        store: AuthStore,
        componentIds: [RESET_PASSWORD_FORM]
      }]
    });
  }

  render() {
    return (
      null
    );
  }
}
