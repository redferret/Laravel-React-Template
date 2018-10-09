
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

describe('Route is set and returns the expected URL', () => {

  let testRoot = 'https://test.com';
  let routeName = 'Test Route';
  let testId = 5;
  let testRoute = `/pass/${testId}`;

  beforeEach(() => {
    Router.root(testRoot);
    Router.registerRoute(routeName, args => {
      return `/pass/${args.id}`;
    });
  });

  it('tests function route and getRoute', () => {
    let theExpectedUrl = `${testRoot}${testRoute}`

    let theActualUrl = Router.route(routeName, {id: testId});
    expect(theActualUrl).toBe(theExpectedUrl);

    theActualUrl = Router.getRoute(testRoot, routeName, {id: testId});
    expect(theActualUrl).toBe(theExpectedUrl);
  });

  it('tests function plainRoute', () => {
    let theExpectedUrl = `${testRoute}`
    let theActualUrl = Router.plainRoute(routeName, {id: testId});

    expect(theActualUrl).toBe(theExpectedUrl);
  });

});

test('checkStatus throws Error on status not in the range [200, 300)', () => {
  let responses = [{
    status: 400
  }, {
    status: 199
  }, {
    status: 300
  }];

  responses.map(theTestResponse => {
    let test = () => {
      checkStatus(theTestResponse)
    };
    expect(test).toThrow(Error);
    try {
      checkStatus(theTestResponse);
    } catch (theError) {
      expect(theError.response).toBe(theTestResponse);
    }
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
