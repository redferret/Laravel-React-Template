import Actions, { checkStatus, parseJSON } from './AppActions.js';
import AuthStore from '../stores/AuthStore.js';
import Router from '../router.js';

import { LOG_IN, ROOT_URL } from '../constants.js';

Actions.register(LOG_IN, payload => {
  fetch(Router.route(LOG_IN), Router.method('POST', payload.values))
  .then(checkStatus)
  .then(response => {
    Actions.relocateTo(response.url);
  }).catch(error => {
    parseJSON(error.response).then(responseJson => {
      AuthStore.setErrors(responseJson.errors);
      Actions.finish(payload);
    });
  });
});
