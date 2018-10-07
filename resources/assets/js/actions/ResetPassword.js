import Actions from './AppActions.js';
import AuthStore from '../stores/AuthStore.js';
import Router, { checkStatus, handleError } from '../router.js';

import { RESET_PASSWORD_REQUEST } from '../constants.js';

Actions.register(RESET_PASSWORD_REQUEST, payload => {
  fetch(Router.route(RESET_PASSWORD_REQUEST), Router.method('POST', payload.values))
  .then(checkStatus)
  .then(response => {
    Router.relocateTo(response.url);
  }).catch(error => {
    parseJSON(error.response).then(errors => {
      AuthStore.setErrors(errors);
      Actions.finish(payload);
    });
  });
});
