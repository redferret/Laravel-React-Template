
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
    if (route instanceof Function) {
      return route(args);
    }
    console.error('The route "'+name+'" was not registered or is not a function');
  }

  method(name, data) {
    let method = this._methods.get(name);
    if (method instanceof Function) {
      return method(data);
    }
    console.error('The method "'+name+'" was not registered or is not a function');
  }
}

let Router = new WebRouter();

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': window.axios.defaults.headers.common['X-CSRF-TOKEN']
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
