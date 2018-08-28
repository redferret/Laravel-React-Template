
class WebRouter {
  constructor() {
    this._routes = new Map();
    this._methods = new Map();
  }

  registerRoute(name, route) {
    this._routes.set(name, route);
  }

  registerMethod(name, method) {
    this._methods.set(name, method);
  }

  route(name, args) {
    let route = this._routes.get(name);
    return route(args);
  }

  method(name, data) {
    let method = this._methods.get(name);
    return method(data);
  }
}

let Router = new WebRouter();

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
};

Router.registerMethod('DELETE', data => {
  return {
    method: 'DELETE',
    headers: HEADERS,
    body: JSON.stringify(data)
  }
});

Router.registerMethod('PUT', data => {
  return {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(data)
  }
});

Router.registerMethod('POST', data => {
  return {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data)
  };
});

Router.registerMethod('GET', data => {
  return {
    method: 'GET',
    headers: HEADERS,
    body: JSON.stringify(data)
  };
});

export default Router;
