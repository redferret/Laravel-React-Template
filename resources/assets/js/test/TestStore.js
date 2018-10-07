import EventEmitter from 'events';
class TestStore extends EventEmitter {
  constructor() {
    super();
  }
}

export default new TestStore();
