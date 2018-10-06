var EventEmitter = require('events').EventEmitter;

class AuthStore extends EventEmitter {
  constructor() {
    super();
    this._message = '';
    this._errors = null;
    this._status = null;
  }

  reset() {
    this._message = '';
    this._errors = null;
    this._status = null;
  }

  setStatus(status) {
    this._status = status;
  }

  getStatus() {
    return this._status;
  }

  setMessage(message) {
    this._message = message;
  }

  getMessage() {
    return this._message;
  }

  setErrors(errors) {
    this._errors = errors;
  }

  getErrors() {
    return this._errors;
  }
}

export default new AuthStore();
