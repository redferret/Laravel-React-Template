import AppDispatcher from '../../dispatcher.js';
import AuthStore from '../../stores/AuthStore.js';
import Input from '../Input.js';
import React from 'react';
import Router from '../../router.js';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FORM
} from '../../constants.js';

import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

export default class ResetPasswordForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.sendResetPassword = this.sendResetPassword.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);

    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  _onChange() {
    this.setState({
      errors: AuthStore.getErrors(),
      status: AuthStore.getStatus(),
      message: AuthStore.getMessage(),
      email: ''
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
    let key = event.target.name;
    let value = event.target.value;
    let eventKey = event.key;
    this.setState({
      [key]: value
    }, () => {
      if (key == 'password_confirmation') {
        if (eventKey === 'Enter') {
          this.sendResetPassword();
        }
      }
    });
  }

  sendResetPassword() {
    AppDispatcher.dispatch({
      action: RESET_PASSWORD_REQUEST,
      values: this.state,
      emitOn: [{
        store: AuthStore,
        componentIds: [RESET_PASSWORD_FORM]
      }]
    });
  }

  render() {
    let errors = this.state.errors;
    let emailError = errors? errors.email : null;
    let passwordError = errors? errors.password : null;
    let status = this.state.status;
    let message = this.state.message;

    return (
      <Form>
        <FormGroup>
          <Col smOffset={3} sm={6}>
            {status? <Alert bsStyle={status == 200 ? 'success':'danger'}>{message}</Alert> : null}
          </Col>
        </FormGroup>
        <Input smOffset={4} sm={4} name='email' type='email'
          placeholder='Example@gmail.com'
          label='Email'
          initialValue={this.state.email}
          validationCallback={() => emailError? 'error' : null}
          help={emailError? emailError : ''}
          callback={this.handleInputChanged}
          autoComplete='on'/>

        <Input smOffset={4} sm={4} name='password' type='password'
          label='Password'
          initialValue={this.state.password}
          validationCallback={() => passwordError? 'error' : null}
          help={passwordError? passwordError : ''}
          callback={this.handleInputChanged}/>

        <Input smOffset={4} sm={4} name='password_confirmation' type='password'
          label='Confirm Password'
          initialValue={this.state.password_confirmation}
          callback={this.handleInputChanged}/>

        <FormGroup>
          <Col smOffset={4} sm={10}>
            <Button onClick={this.postRegister}>Reset Password</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
