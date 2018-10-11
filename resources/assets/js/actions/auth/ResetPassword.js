import Actions from '../AppActions.js';
import AuthStore from '../../stores/AuthStore.js';
import Axios from 'axios';
import Router, { checkStatus } from '../../router.js';

import { RESET_PASSWORD_REQUEST } from '../../constants.js';

Actions.register(RESET_PASSWORD_REQUEST, payload => {
  Axios(Router.request('POST', RESET_PASSWORD_REQUEST, {
    data: payload.values
  }))
  .then(checkStatus)
  .then(response => {
    Router.relocateTo(response.request.responseURL);
  }).catch(error => {
    AuthStore.setErrors(error.response.data.errors);
    Actions.finish(payload);
  });
});
