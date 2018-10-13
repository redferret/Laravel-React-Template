import AppDispatcher from '../../dispatcher.js';
import AuthStore from '../../stores/AuthStore.js';
import Input from '../Input.js';
import React from 'react';
import Router from '../../router.js';

import {
  SEND_PASSWORD_RESET,
  SEND_PASSWORD_RESET_FORM
} from '../../constants.js';

import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

export default class RequestResetLink extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.sendResetLink = this.sendResetLink.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);

    this.state = {
      email: '',
      password: '',
      remember: 0
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
    AuthStore.on('send-reset-form', this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeListener('send-reset-form', this._onChange.bind(this));
  }

  handleInputChanged(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name == 'email') {
      if (event.key == 'Enter') {
        this.sendResetLink();
      }
    }
  }

  sendResetLink() {
    AppDispatcher.dispatch({
      action: SEND_PASSWORD_RESET,
      values: this.state,
      emitOn: [{
        store: AuthStore,
        componentIds: ['send-reset-form']
      }]
    });
  }

  render() {

    let errors = this.state.errors;
    let emailError = errors? errors.email : null;
    let status = this.state.status;
    let message = this.state.message;
    let validation = emailError? 'error' : (status? (status == 200 ? 'success' : 'error') : null);

    return (
      <Form horizontal>
        <FormGroup>
          <Col smOffset={4} sm={4}>
            {status? <Alert bsStyle={status == 200 ? 'success':'danger'}>{message}</Alert> : null}
          </Col>
        </FormGroup>
        <Input smOffset={4} sm={4} name='email' type='email'
          placeholder='Example@gmail.com'
          label='Enter Your Email Address'
          initialValue={this.state.email}
          validationCallback={() => validation}
          help={emailError? emailError : ''}
          callback={this.handleInputChanged}
          autoComplete='on'/>

        <FormGroup>
          <Col smOffset={4} sm={10}>
            <Button bsStyle='info' onClick={this.sendResetLink}>Send Password Reset Link</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
