import AppActions from '../actions/AppActions.js';
import AppDispatcher from '../dispatcher.js';
import TestStore from './TestStore.js';

test('Action is registered and can be called', () => {
  let ACTION = 'Test-Action';
  let testPayload = {
    action: ACTION,
    foo: 'bar'
  };

  AppActions.register(ACTION, payload => {
    expect(payload.action).toBe(ACTION);
    expect(payload.foo).toBe('bar');
  });

  AppActions.call(testPayload);
});

test("AppActions throws Error if action doesn't exist", () => {
  let testPayload = {
    action: 'Foo-Bar'
  };

  expect(() => {
    AppActions.call(testPayload);
  }).toThrow(Error);
});

test('AppActions throws Error if action is not a function', () => {
  let ACTION = 'Test-Action';
  let testPayload = {
    action: ACTION,
    foo: 'bar'
  };

  AppActions.register(ACTION, 'Not a function');

  expect(() => {
    AppActions.call(testPayload);
  }).toThrow(Error);
});

test('AppDispatcher calls action, tests payload, and that the action finishes', () => {

  let emitMock = jest.spyOn(TestStore, 'emit');
  emitMock.mockClear();
  
  let ACTION = 'Test-Action';
  let testPayload = {
    action: ACTION,
    foo: 'bar',
    emitOn: [{
      store: TestStore,
      componentIds: ['Test-Id']
    }]
  };

  AppActions.register(ACTION, payload => {
    AppActions.finish(payload);
  });

  AppDispatcher.dispatch(testPayload);

  expect(emitMock).toHaveBeenCalledTimes(1);
});

test('AppActions.finish emits on the given store', () => {

  let emitMock = jest.spyOn(TestStore, 'emit');
  emitMock.mockClear();

  let ACTION = 'Test-Action';
  let payload = {
    action: ACTION,
    emitOn: [{
      store: TestStore, // The store to emit on
      componentIds: ['Test-Id', 'Another-Id']
    }]
  };

  AppActions.finish(payload);

  expect(emitMock).toHaveBeenCalledTimes(2);
});
