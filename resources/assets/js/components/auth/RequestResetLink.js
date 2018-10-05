import AppDispatcher from '../../dispatcher.js';
import Input from '../Input.js';
import AuthStore from '../../stores/AuthStore.js';
import React from 'react';
import Router from '../../router.js';
import { SEND_PASSWORD_RESET } from '../../constants.js';

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
      values: {
        email: '',
        password: '',
        remember: 0
      }
    }
  }

  _onChange() {
    this.setState({
      errors: AuthStore.getErrors(),
      successMsg: AuthStore.getMessage()
    });
    AuthStore.setSuccess('');
    AuthStore.setErrors(null);
  }

  componentDidMount() {
    AuthStore.on('send-reset-form', this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeListener('send-reset-form', this._onChange.bind(this));
  }

  handleInputChanged(event) {
    let values = this.state.values;
    values[event.target.name] = event.target.value;
    this.setState({
      values: values
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
      values: this.state.values,
      emitOn: [{
        store: AuthStore,
        componentIds: ['send-reset-form']
      }]
    });
  }

  render() {
    let errors = this.state.errors;
    let emailError = typeof errors !== 'undefined'? errors.email : null;
    let success = this.state.successMsg;

    return (
      <Form horizontal>
        <FormGroup>
          <Col smOffset={4} sm={4}>
            {success? <Alert bsStyle='success'>{success}</Alert> : null}
          </Col>
        </FormGroup>
        <Input smOffset={4} sm={4} name='email' type='email' placeholder='Example@gmail.com'
          label='Enter Your Email Address'
          initialValue={success? '' : this.state.values.email}
          validationCallback={() => emailError? 'error' : (success? 'success' : null)}
          help={emailError? emailError : ''}
          callback={(event) => this.handleInputChanged(event)} autoComplete='on'/>

        <FormGroup>
          <Col smOffset={4} sm={10}>
            <Button bsStyle='info' onClick={this.sendResetLink}>Send Password Reset Link</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
