import Actions, { checkStatus, parseJSON } from './AppActions.js';
import AuthStore from '../stores/AuthStore.js';
import Router from '../router.js';

import { SEND_PASSWORD_RESET } from '../constants.js';

Actions.register(SEND_PASSWORD_RESET, payload => {
  fetch(Router.route(SEND_PASSWORD_RESET), Router.method('POST', payload.values))
  .then(checkStatus)
  .then(response => {
    AuthStore.setSuccess('We have e-mailed your password reset link!');
  }).catch(error => {
    parseJSON(error.response).then(errors => {
      AuthStore.setErrors(errors);
      Actions.finish(payload);
    });
  });
});
