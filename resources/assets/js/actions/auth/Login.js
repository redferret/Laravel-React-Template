import Actions from '../AppActions.js';
import AuthStore from '../../stores/AuthStore.js';
import Axios from 'axios';
import Router, { checkStatus } from '../../router.js';

import { LOG_IN } from '../../constants.js';

Actions.register(LOG_IN, payload => {
  Axios(Router.request('POST', LOG_IN, {
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
