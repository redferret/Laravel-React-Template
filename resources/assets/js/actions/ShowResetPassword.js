import Actions from './AppActions.js';
import AuthStore from '../stores/AuthStore.js';
import Router, { checkStatus, handleError } from '../router.js';

import { SHOW_PASSWORD_RESET } from '../constants.js';

Actions.register(SHOW_PASSWORD_RESET, payload => {
  fetch(Router.route(SHOW_PASSWORD_RESET))
  .then(checkStatus)
  .then(response => {
    Router.relocateTo(response.url);
  }).catch(handleError);
});
