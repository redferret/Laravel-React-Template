
import $ from 'jquery';

let axiosDefaults = require('axios/lib/defaults');

export function getCSRF() {
  try {
    return window.axios.defaults.headers.common['X-CSRF-TOKEN']
  } catch (error) {
    return 'Not Defined';
  }
}

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': getCSRF()
};

class Router {
  constructor() {
    this._routes = new Map();
    try {
      axiosDefaults.baseURL = $('meta[name="baseURL"]').attr('content');
    } catch(error) {
      // Do nothing... who cares
    }
  }

  registerRoute(name, route) {
    this._routes.set(name, route);
  }

  route(name, args) {
    return `${axiosDefaults.baseURL}${this.partialRoute(name, args)}`;
  }

  partialRoute(name, args) {
    let route = this._routes.get(name);
    if (route instanceof Function) {
      return route(args);
    }
    console.error(`The route ${name} was not registered or is not a function`);
  }

  relocateTo(url) {
    window.location.replace(url);
  }

  setUrl(url) {
    window.location.href = url;
  }

  request(type, routeName, requestData, headers) {
    if (typeof requestData == 'undefined' || requestData == null) {
      requestData = {};
    }
    return {
      method: type,
      url: this.partialRoute(routeName, requestData.args),
      headers: headers? headers : HEADERS,
      data: requestData.data
    }
  }
}

export function handleError(error) {
  console.error('HTTP request failed', error);
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export default new Router();
