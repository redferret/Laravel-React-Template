import AppDispatcher from '../../dispatcher.js';
import AuthStore from '../../stores/AuthStore.js';
import Input from '../Input.js';
import React from 'react';
import Router from '../../router.js';

import {
  LOG_IN,
  LOG_IN_FORM,
  SHOW_PASSWORD_RESET
} from '../../constants.js';

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
      email: '',
      password: '',
      remember: 0
    }
  }

  _onChange() {
    this.setState({
      errors: AuthStore.getErrors()
    })
  }

  componentDidMount() {
    AuthStore.on(LOG_IN_FORM, this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeListener(LOG_IN_FORM, this._onChange.bind(this));
  }

  handleInputChanged(event) {
    let key = event.target.name;
    let value = event.target.value;
    let eventKey = event.key;
    this.setState({
      [key]: value
    }, () => {
      if (key == 'password') {
        if (eventKey === 'Enter') {
          this.postLogin();
        }
      }
    });
  }

  postLogin() {
    AppDispatcher.dispatch({
      action: LOG_IN,
      values: this.state,
      emitOn: [{
        store: AuthStore,
        componentIds: [LOG_IN_FORM]
      }]
    });
  }

  render() {
    let errors = this.state.errors;
    let emailError = errors? errors.email : null;
    let passwordError = errors? errors.password : null;
    return (
      <Form horizontal>
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

        <FormGroup>
          <Col smOffset={4} sm={4}>
            <Checkbox id='rememberMe'>Remember me</Checkbox>
            <a href={Router.route(SHOW_PASSWORD_RESET)}>Forgot Password</a>
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
