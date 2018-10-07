
import Router from '../router.js';

const ROOT = '/root/test';

test('Root is set', () => {
  Router.root(ROOT);
  expect(Router._root).toBe(ROOT);
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
