var EventEmitter = require('events').EventEmitter;

class ExampleStore extends EventEmitter {

  constructor() {
    super();
    this._message = 'Waiting For Message...';
    this._status = 'danger';
  }

  setExampleMessage(message) {
    this._message = message;
    this._status = 'success';
  }

  getStatus() {
    return this._status;
  }

  getExampleMessage() {
    return this._message;
  }
};

export default new ExampleStore();
