var EventEmitter = require('events').EventEmitter;

class AuthStore extends EventEmitter {
  constructor() {
    super();
    this._errors = {
      errors: ''
    };
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
