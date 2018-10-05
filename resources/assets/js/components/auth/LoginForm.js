import AppDispatcher from '../../dispatcher.js';
import Input from '../Input.js';
import AuthStore from '../../stores/AuthStore.js';
import React from 'react';
import Router from '../../router.js';
import { LOG_IN } from '../../constants.js';

import {
  Button,
  Checkbox,
  Col,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

export default class LoginForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.postLogin = this.postLogin.bind(this);
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
      errors: AuthStore.getErrors()
    })
  }

  componentDidMount() {
    AuthStore.on('login-form', this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeListener('login-form', this._onChange.bind(this));
  }

  handleInputChanged(event) {
    let values = this.state.values;
    values[event.target.name] = event.target.value;
    this.setState({
      values: values
    });
    if (event.target.name == 'password') {
      if (event.key === 'Enter') {
        this.postLogin();
      }
    }
  }

  postLogin() {
    AppDispatcher.dispatch({
      action: LOG_IN,
      values: this.state.values,
      emitOn: [{
        store: AuthStore,
        componentIds: ['login-form']
      }]
    });
  }

  render() {
    let errors = this.state.errors;
    let emailError = typeof errors !== 'undefined'? errors.email : null;
    let passwordError = typeof errors !== 'undefined'? errors.password : null;
    return (
      <Form horizontal>
        <Input smOffset={4} sm={4} name='email' type='email' placeholder='Example@gmail.com' label='Email'
          initialValue={this.state.values.email}
          validationCallback={() => emailError? 'error' : null}
          help={emailError? emailError : ''}
          callback={(event) => this.handleInputChanged(event)} autoComplete='on'/>

        <Input smOffset={4} sm={4} name='password' type='password' label='Password'
          initialValue={this.state.values.password}
          validationCallback={() => passwordError? 'error' : null}
          help={passwordError? passwordError : ''}
          callback={(event) => this.handleInputChanged(event)}/>

        <FormGroup>
          <Col smOffset={4} sm={4}>
            <Checkbox id='rememberMe'>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={4} sm={10}>
            <Button onClick={this.postLogin}>Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
