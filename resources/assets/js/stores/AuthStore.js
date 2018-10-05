var EventEmitter = require('events').EventEmitter;

class AuthStore extends EventEmitter {
  constructor() {
    super();
    this._message = '';
    this._errors = {
      errors: ''
    };
  }

  setSuccess(message) {
    this._message = message;
  }

  getMessage() {
    return this._message;
  }

  setErrors(errors) {
    this._errors = errors;
  }

  getErrors() {
    return this._errors.errors;
  }

  getMessage() {
    return this._errors.message;
  }
}

export default new AuthStore();
