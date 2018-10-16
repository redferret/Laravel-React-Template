
import Router, { checkStatus, handleError } from '../router.js';
let axiosDefaults = require('axios/lib/defaults');

describe('Route is set and returns the expected URL', () => {

  let testRoot = 'https://test.com';
  let routeName = 'Test Route';
  let testId = 5;
  let testRoute = `/pass/${testId}`;

  beforeEach(() => {
    axiosDefaults.baseURL = testRoot;
    Router.registerRoute(routeName, args => {
      return `/pass/${args.id}`;
    });
  });

  it('tests the route functions', () => {
    let partialRouteMock = jest.spyOn(Router, 'partialRoute');
    partialRouteMock.mockClear();

    let theExpectedUrl = `${testRoot}${testRoute}`
    let theActualUrl = Router.route(routeName, {id: testId});

    expect(partialRouteMock).toHaveBeenCalledTimes(1);
    expect(theActualUrl).toBe(theExpectedUrl);
  });

  it('tests the partialRoute function', () => {
    let theActualUrl = Router.partialRoute(routeName, {id: testId});
    let theExpectedUrl = testRoute;
    expect(theActualUrl).toBe(theExpectedUrl);
  })

  it('tests the request function', () => {
    let theExpectedRequest = {
      method: 'post',
      url: testRoute,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': 'Not Defined'
      }
    };

    let theRequest = Router.request('post', routeName, {
      args: {
        id: testId
      }
    });
    expect(theRequest).toEqual(theExpectedRequest);
  });

  it('tests custom headers', () => {
    let customHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-CSRF-TOKEN': 'Not Defined'
    }
    let theExpectedRequest = {
      method: 'post',
      url: testRoute,
      headers: customHeaders
    };

    let theRequest = Router.request('post', routeName, {
      args: {
        id: testId
      }
    }, customHeaders);
    expect(theRequest).toEqual(theExpectedRequest);
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
