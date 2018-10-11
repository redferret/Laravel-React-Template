import Actions from '../AppActions.js';
import AuthStore from '../../stores/AuthStore.js';
import Axios from 'axios';
import Router, { checkStatus } from '../../router.js';

import { SEND_PASSWORD_RESET } from '../../constants.js';

Actions.register(SEND_PASSWORD_RESET, payload => {
  Axios(Router.request('POST', SEND_PASSWORD_RESET, {
    data: payload.values
  }))
  .then(checkStatus)
  .then(response => {
    AuthStore.setMessage('If an account matching the given email is found you will receive an email shortly');
    AuthStore.setStatus(response.status);
    Actions.finish(payload);
  }).catch(error => {
    try {
      if (error.response) {
        AuthStore.setStatus(error.response.status);
        AuthStore.setMessage(error.response.data.message);
        if (error.response.data.errors) {
          AuthStore.setErrors(error.response.data.errors);
        }
        Actions.finish(payload);
      } else {
        console.error('Critical Error Occured', exception);
      }
    } catch(exception) {
      console.error('Critical Error Occured', exception);
    }
  });
});
