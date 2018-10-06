import Actions, { checkStatus, parseJSON } from './AppActions.js';
import AuthStore from '../stores/AuthStore.js';
import Router from '../router.js';

import { SEND_PASSWORD_RESET } from '../constants.js';

Actions.register(SEND_PASSWORD_RESET, payload => {
  fetch(Router.route(SEND_PASSWORD_RESET), Router.method('POST', payload.values))
  .then(checkStatus)
  .then(response => {
    AuthStore.setMessage('If your email exists you\'ll get a reset link!');
    AuthStore.setStatus(response.status);
    Actions.finish(payload);
  }).catch(error => {
    try {
      if (error.response) {
        parseJSON(error.response).then(errors => {
          AuthStore.setMessage(errors.message);
          AuthStore.setStatus(error.response.status);
          AuthStore.setErrors(errors);
          Actions.finish(payload);
        });
      }
    } catch(exception) {
      console.error('Critical Error Occured', exception);
    }
  });
});
