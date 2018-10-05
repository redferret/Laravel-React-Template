var EventEmitter = require('events').EventEmitter;

class ExampleStore extends EventEmitter {

  constructor() {
    super();
    this._message = 'Waiting For Message...';
  }

  setExampleMessage(message) {
    this._message = message;
  }

  getExampleMessage() {
    return this._message;
  }
};

export default new ExampleStore();
