import AppDispatcher from '../../dispatcher.js';
import AuthStore from '../../stores/AuthStore.js';
import Input from '../Input.js';
import React from 'react';
import Router from '../../router.js';

import {
  REGISTER,
  REGISTER_FORM
} from '../../constants.js';

import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

export default class RegisterForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.postRegister = this.postRegister.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  _onChange() {
    this.setState({
      errors: AuthStore.getErrors()
    })
  }

  componentDidMount() {
    AuthStore.on(REGISTER_FORM, this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeListener(REGISTER_FORM, this._onChange.bind(this));
  }

  handleInputChanged(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  postRegister() {
    AppDispatcher.dispatch({
      action: REGISTER,
      values: this.state,
      emitOn: [{
        store: AuthStore,
        componentIds: [REGISTER_FORM]
      }]
    });
  }

  render() {
    let errors = this.state.errors;
    let emailError = errors? errors.email : null;
    let passwordError = errors? errors.password : null;
    return (
      <Form horizontal>
        <Input smOffset={4} sm={4} name='name' type='text'
          placeholder='John Doe'
          label='Name'
          initialValue={this.state.values.name}
          autoComplete='on'
          callback={this.handleInputChanged}/>

        <Input smOffset={4} sm={4} name='email' type='email'
          placeholder='Example@gmail.com'
          label='Email'
          initialValue={this.state.values.email}
          validationCallback={() => emailError? 'error' : null}
          help={emailError? emailError : ''}
          callback={this.handleInputChanged}
          autoComplete='on'/>

        <Input smOffset={4} sm={4} name='password' type='password'
          label='Password'
          initialValue={this.state.values.password}
          validationCallback={() => passwordError? 'error' : null}
          help={passwordError? passwordError : ''}
          callback={this.handleInputChanged}/>

        <Input smOffset={4} sm={4} name='password_confirmation'
          type='password'
          label='Confirm Password'
          initialValue={this.state.values.password_confirmation}
          callback={this.handleInputChanged}/>

        <FormGroup>
          <Col smOffset={4} sm={10}>
            <Button onClick={this.postRegister}>Register</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
