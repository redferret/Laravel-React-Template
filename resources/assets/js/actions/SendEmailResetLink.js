import Actions, { checkStatus, handleError } from './AppActions.js';
import AuthStore from '../stores/AuthStore.js';
import Router from '../router.js';

import { SEND_PASSWORD_RESET } from '../constants.js';

Actions.register(SEND_PASSWORD_RESET, payload => {
  fetch(Router.route(SEND_PASSWORD_RESET), Router.method('POST', payload.values))
  .then(checkStatus)
  .then(response => {
    Actions.relocateTo(response.url);
  }).catch(handleError);
});
