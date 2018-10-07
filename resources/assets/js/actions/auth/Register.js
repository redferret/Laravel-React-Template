import Actions from '../AppActions.js';
import AuthStore from '../../stores/AuthStore.js';
import Router, { checkStatus, parseJSON } from '../../router.js';

import { REGISTER } from '../../constants.js';

Actions.register(REGISTER, payload => {
  fetch(Router.route(REGISTER), Router.method('POST', payload.values))
  .then(checkStatus)
  .then(response => {
    Router.relocateTo(response.url);
  }).catch(error => {
    parseJSON(error.response).then(responseJson => {
      AuthStore.setErrors(responseJson.errors);
      Actions.finish(payload);
    });
  });
});
