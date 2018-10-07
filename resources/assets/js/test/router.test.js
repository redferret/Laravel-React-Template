
import Router, { checkStatus, handleError } from '../router.js';

test('Root is set', () => {
  let TestRoot = '/root/test';
  Router.root(TestRoot);
  expect(Router._root).toBe(TestRoot);
});

test('Basic CRUD methods exist', () => {
  let methods = ['POST', 'PUT', 'GET', 'DELETE'];
  let data = {id: 10, name: 'test'};
  let testData = JSON.stringify(data);

  methods.map(method => {
    let m = Router.method(method, data);
    expect(m.method).toBe(method);
    expect(m.body).toBe(testData);
  })
});

test('Route is set and returns the expected URL', () => {
  let testRoot = 'https://test.com';
  let routeName = 'Test Route';
  let testId = 5;
  let testRoute = `/pass/${testId}`;

  Router.root(testRoot);
  Router.registerRoute(routeName, args => {
    return `/pass/${args.id}`;
  });

  let URL = `${testRoot}${testRoute}`
  let actualURL = Router.route(routeName, {id: testId});

  expect(actualURL).toBe(URL);
});

test('checkStatus throws Error on status not in the range [200, 300)', () => {
  let responses = [{
    status: 400
  }, {
    status: 199
  }, {
    status: 300
  }];

  responses.map(response => {
    let test = () => {
      checkStatus(response)
    };
    expect(test).toThrow(Error);
  });
});

test('checkStatus returns response with a status in the range [200, 300)', () => {
  let responses = [{
    status: 200
  }, {
    status: 250
  }, {
    status: 299
  }];

  responses.map(response => {
    let test = () => {
      checkStatus(response)
    };
    expect(test).not.toThrow(Error);
    expect(checkStatus(response)).toBe(response);
  });
});
