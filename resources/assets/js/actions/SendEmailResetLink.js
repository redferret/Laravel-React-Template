import Actions from './AppActions.js';
import AuthStore from '../stores/AuthStore.js';
import Router, { checkStatus, parseJSON } from '../router.js';

import { SEND_PASSWORD_RESET } from '../constants.js';

Actions.register(SEND_PASSWORD_RESET, payload => {
  fetch(Router.route(SEND_PASSWORD_RESET), Router.method('POST', payload.values))
  .then(checkStatus)
  .then(response => {
    AuthStore.setMessage('If an account matching the given email is found you will receive an email shortly');
    AuthStore.setStatus(response.status);
    Actions.finish(payload);
  }).catch(error => {
    try {
      if (error.response) {
        AuthStore.setStatus(error.response.status);
        parseJSON(error.response).then(responseJson => {
          AuthStore.setMessage(responseJson.message);
          if (responseJson.errors) {
            AuthStore.setErrors(responseJson.errors.errors);
          }
          Actions.finish(payload);
        });
      }
    } catch(exception) {
      console.error('Critical Error Occured', exception);
    }
  });
});
