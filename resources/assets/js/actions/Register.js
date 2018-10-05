import Actions, { checkStatus, parseJSON } from './AppActions.js';
import AuthStore from '../stores/AuthStore.js';
import Router from '../router.js';

import { REGISTER } from '../constants.js';

Actions.register(REGISTER, payload => {
  fetch(Router.route(REGISTER), Router.method('POST', payload.values))
  .then(checkStatus)
  .then(response => {
    Actions.relocateTo(response.url);
  }).catch(error => {
    parseJSON(error.response).then(errors => {
      AuthStore.setErrors(errors);
      Actions.finish(payload);
    });
  });
});
